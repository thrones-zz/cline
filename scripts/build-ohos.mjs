#!/usr/bin/env node
/**
 * OpenHarmony Build Adapter for Cline
 * 
 * This script handles the OpenHarmony platform compatibility issues
 * that arise when building the cline project on OpenHarmony devices.
 * 
 * It patches the Node.js platform detection to treat OpenHarmony as Linux,
 * and handles protoc installation for proto file compilation.
 */

import { execFileSync, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import zlib from 'zlib';
import { promisify } from 'util';

const decompress = promisify(zlib.unzip);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const PROTOC_VERSION = '27.1';
const PROTOC_URL_LINUX_X86_64 = `https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip`;
const PROTOC_URL_LINUX_AARCH64 = `https://github.com/protocolbuffers/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-aarch_64.zip`;

/**
 * Patches Node.js platform detection to treat OpenHarmony as Linux
 */
function patchPlatform() {
    // Detect if running on OpenHarmony
    const platform = process.platform;
    const release = process.release?.name || '';
    
    if (platform === 'linux' && release === 'Node.js') {
        // Check if it's actually OpenHarmony by reading /etc/os-release
        try {
            const osRelease = fs.readFileSync('/etc/os-release', 'utf8');
            if (osRelease.includes('OpenHarmony') || osRelease.includes('ohos')) {
                console.log('[OHOS Build] Detected OpenHarmony platform');
                console.log('[OHOS Build] Patching Node.js platform detection...');
                
                // Patch process.platform
                const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
                Object.defineProperty(process, 'platform', {
                    get: () => 'linux',
                    configurable: true
                });
                
                // Also patch os.platform()
                const os = require('os');
                Object.defineProperty(os, 'platform', {
                    get: () => 'linux',
                    configurable: true
                });
                
                console.log('[OHOS Build] Platform patched successfully');
            }
        } catch (e) {
            // /etc/os-release not readable, continue
        }
    }
}

/**
 * Downloads a file from URL
 */
async function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirect
                https.get(response.headers.location, (response2) => {
                    response2.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve();
                    });
                }).on('error', reject);
            } else {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }
        }).on('error', reject);
    });
}

/**
 * Installs protoc to the project
 */
async function installProtoc() {
    const protocDir = path.join(PROJECT_ROOT, 'node_modules', 'grpc-tools', 'bin');
    const protocPath = path.join(protocDir, 'protoc');
    
    // Check if protoc already exists and works
    try {
        execFileSync(protocPath, ['--version'], { stdio: 'pipe' });
        console.log('[OHOS Build] protoc already installed');
        return true;
    } catch (e) {
        // protoc doesn't exist or doesn't work
    }
    
    // Create bin directory if needed
    if (!fs.existsSync(protocDir)) {
        fs.mkdirSync(protocDir, { recursive: true });
    }
    
    // Determine architecture
    const arch = process.arch;
    const isArm = arch === 'arm64';
    const url = isArm ? PROTOC_URL_LINUX_AARCH64 : PROTOC_URL_LINUX_X86_64;
    const zipPath = path.join(protocDir, 'protoc.zip');
    
    console.log(`[OHOS Build] Downloading protoc from ${url}...`);
    
    try {
        // Download
        await downloadFile(url, zipPath);
        
        // Extract
        console.log('[OHOS Build] Extracting protoc...');
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(protocDir, true);
        
        // Make executable
        fs.chmodSync(path.join(protocDir, 'bin', 'protoc'), 0o755);
        
        // Clean up
        fs.unlinkSync(zipPath);
        
        console.log('[OHOS Build] protoc installed successfully');
        return true;
    } catch (e) {
        console.error('[OHOS Build] Failed to install protoc:', e.message);
        return false;
    }
}

/**
 * Main build function
 */
async function main() {
    console.log('[OHOS Build] Starting OpenHarmony build process...');
    console.log('[OHOS Build] Current platform:', process.platform);
    console.log('[OHOS Build] Current arch:', process.arch);
    
    // Apply platform patches
    patchPlatform();
    
    // Install protoc
    const protocInstalled = await installProtoc();
    if (!protocInstalled) {
        console.error('[OHOS Build] Failed to install protoc, exiting');
        process.exit(1);
    }
    
    // Run the original build-proto script with patched environment
    console.log('[OHOS Build] Running proto compilation...');
    try {
        execSync('node scripts/build-proto.mjs', {
            cwd: PROJECT_ROOT,
            stdio: 'inherit',
            env: {
                ...process.env,
                npm_config_platform: 'linux',
                npm_config_arch: process.arch
            }
        });
        console.log('[OHOS Build] Proto compilation completed');
    } catch (e) {
        console.error('[OHOS Build] Proto compilation failed');
        process.exit(1);
    }
    
    // Run CLI build
    console.log('[OHOS Build] Running CLI build...');
    try {
        execSync('cd cli && npm run build', {
            cwd: PROJECT_ROOT,
            stdio: 'inherit',
            env: {
                ...process.env,
                npm_config_platform: 'linux',
                npm_config_arch: process.arch
            }
        });
        console.log('[OHOS Build] CLI build completed');
    } catch (e) {
        console.error('[OHOS Build] CLI build failed');
        process.exit(1);
    }
    
    console.log('[OHOS Build] Build process completed successfully!');
}

// Run main
main().catch((e) => {
    console.error('[OHOS Build] Error:', e);
    process.exit(1);
});

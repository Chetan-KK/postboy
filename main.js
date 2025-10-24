// Main JavaScript file for Postboy
// Theme setting is shared across all pages (index, get-docs, post-docs)

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const requestMethodSelect = document.getElementById('request-method');
const urlInput = document.getElementById('url-input');
const sendBtn = document.getElementById('send-btn');
const saveEndpointBtn = document.getElementById('save-endpoint-btn');

// Authentication Elements
const authTypeSelect = document.getElementById('auth-type');
const bearerTokenInput = document.getElementById('bearer-token');
const bearerContainer = document.getElementById('bearer-container');
const basicContainer = document.getElementById('basic-container');
const basicUsernameInput = document.getElementById('basic-username');
const basicPasswordInput = document.getElementById('basic-password');

// Mobile Navigation Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const sidebarThemeToggleBtn = document.getElementById('sidebar-theme-toggle-btn');

// Saved Endpoints Elements
const savedEndpointsSidebar = document.querySelector('.saved-endpoints-sidebar');
const showSavedSidebarBtn = null;
const headerSavedSidebarBtn = document.getElementById('header-saved-sidebar-btn');
const savedEndpointsList = document.getElementById('saved-endpoints-list');
const noSavedEndpointsMsg = document.querySelector('.no-saved-endpoints');
const mainContainer = document.querySelector('main');
const newCollectionBtn = document.getElementById('new-collection-btn');
const manageCollectionsBtn = document.getElementById('manage-collections-btn');
const exportBtn = document.getElementById('export-btn');
const importFileInput = document.getElementById('import-file');
const importBtn = document.getElementById('import-btn');
const envSelect = document.getElementById('env-select');
const manageEnvsBtn = document.getElementById('manage-envs-btn');
const corsProxyUrlInput = document.getElementById('cors-proxy-url');
const corsProxyToggle = document.getElementById('cors-proxy-toggle');

// Get current theme from localStorage
const currentTheme = localStorage.getItem('postboyTheme') || 'dark-mode';

// Mobile Navigation Toggle
function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    mobileMenuBtn.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('sidebar-open');
}

// Event listeners for mobile navigation
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', toggleSidebar);
}

// Sync sidebar theme toggle button icon
if (sidebarThemeToggleBtn) {
    const sidebarIcon = sidebarThemeToggleBtn.querySelector('i');
    if (currentTheme === 'light-mode') {
        sidebarIcon.classList.remove('fa-moon');
        sidebarIcon.classList.add('fa-sun');
    } else {
        sidebarIcon.classList.remove('fa-sun');
        sidebarIcon.classList.add('fa-moon');
    }
    
    // Add click event for sidebar theme toggle
    sidebarThemeToggleBtn.addEventListener('click', () => {
        const body = document.body;
        const mainIcon = themeToggleBtn.querySelector('i');
        const sidebarIcon = sidebarThemeToggleBtn.querySelector('i');
        
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            
            // Update icons
            mainIcon.classList.remove('fa-moon');
            mainIcon.classList.add('fa-sun');
            sidebarIcon.classList.remove('fa-moon');
            sidebarIcon.classList.add('fa-sun');
            
            // Toggle highlight.js themes
            hljsDarkTheme.disabled = true;
            hljsLightTheme.disabled = false;
            
            // Save theme preference to localStorage
            localStorage.setItem('postboyTheme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            
            // Update icons
            mainIcon.classList.remove('fa-sun');
            mainIcon.classList.add('fa-moon');
            sidebarIcon.classList.remove('fa-sun');
            sidebarIcon.classList.add('fa-moon');
            
            // Toggle highlight.js themes
            hljsDarkTheme.disabled = false;
            hljsLightTheme.disabled = true;
            
            // Save theme preference to localStorage
            localStorage.setItem('postboyTheme', 'dark-mode');
        }
        
        // Re-highlight visible code blocks
        document.querySelectorAll('pre code').forEach(block => {
            if (block.textContent) {
                hljs.highlightElement(block);
            }
        });
    });
}

// Dark/Light Mode Toggle - Main button
themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    const mainIcon = themeToggleBtn.querySelector('i');
    const sidebarIcon = sidebarThemeToggleBtn ? sidebarThemeToggleBtn.querySelector('i') : null;
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        
        // Update icons
        mainIcon.classList.remove('fa-moon');
        mainIcon.classList.add('fa-sun');
        
        if (sidebarIcon) {
            sidebarIcon.classList.remove('fa-moon');
            sidebarIcon.classList.add('fa-sun');
        }
        
        // Toggle highlight.js themes
        hljsDarkTheme.disabled = true;
        hljsLightTheme.disabled = false;
        
        // Save theme preference to localStorage
        localStorage.setItem('postboyTheme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        
        // Update icons
        mainIcon.classList.remove('fa-sun');
        mainIcon.classList.add('fa-moon');
        
        if (sidebarIcon) {
            sidebarIcon.classList.remove('fa-sun');
            sidebarIcon.classList.add('fa-moon');
        }
        
        // Toggle highlight.js themes
        hljsDarkTheme.disabled = false;
        hljsLightTheme.disabled = true;
        
        // Save theme preference to localStorage
        localStorage.setItem('postboyTheme', 'dark-mode');
    }
    
    // Re-highlight visible code blocks
    document.querySelectorAll('pre code').forEach(block => {
        if (block.textContent) {
            hljs.highlightElement(block);
        }
    });
});

// Tab Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const addParamBtn = document.getElementById('add-param-btn');
const addHeaderBtn = document.getElementById('add-header-btn');
const addFormBtn = document.getElementById('add-form-btn');
const paramsContainer = document.getElementById('params-container');
const headersContainer = document.getElementById('headers-container');
const bodyTypeSelect = document.getElementById('body-type');
const bodyFormContainer = document.getElementById('body-form-container');
const bodyRawContainer = document.getElementById('body-raw-container');
const jsonBodyTextarea = document.getElementById('json-body');

// Response Elements
const statusCodeElem = document.getElementById('status-code');
const responseTimeElem = document.getElementById('response-time');
const responseBodyElem = document.getElementById('response-body');
const responseHeadersElem = document.getElementById('response-headers');
const copyResponseBtn = document.getElementById('copy-response-btn');

// Default response messages
const DEFAULT_BODY_MESSAGE = 'Make a request to see the response here';
const DEFAULT_HEADERS_MESSAGE = 'Make a request to see the response headers here';

// Loading Overlay Element
const loadingOverlay = document.getElementById('loading-overlay');

// Highlight.js Theme Elements
const hljsDarkTheme = document.getElementById('hljs-dark-theme');
const hljsLightTheme = document.getElementById('hljs-light-theme');

// Method settings
const HTTP_METHODS = {
    GET: { hasBody: false, useParams: true },
    POST: { hasBody: true, useParams: false },
    PUT: { hasBody: true, useParams: false },
    PATCH: { hasBody: true, useParams: false },
    DELETE: { hasBody: false, useParams: true },
    HEAD: { hasBody: false, useParams: true, bodylessResponse: true }
};

// Initialize JSON syntax highlighting for the textarea
let jsonEditor = null;

// Interactive elements that should be disabled during requests
const interactiveElements = [
    sendBtn,
    saveEndpointBtn,
    requestMethodSelect,
    urlInput,
    bodyTypeSelect,
    jsonBodyTextarea,
    authTypeSelect,
    bearerTokenInput,
    basicUsernameInput,
    basicPasswordInput,
    themeToggleBtn,
    ...document.querySelectorAll('.tab-btn'),
    ...document.querySelectorAll('.add-btn'),
    ...document.querySelectorAll('.remove-btn'),
    ...document.querySelectorAll('.key-input'),
    ...document.querySelectorAll('.value-input')
];

// Function to set loading state
function setLoading(isLoading) {
    if (isLoading) {
        loadingOverlay.classList.remove('hidden');
        
        // Disable all interactive elements
        interactiveElements.forEach(element => {
            if (element) {
                element.disabled = true;
            }
        });
        
        // Disable removal buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });
    } else {
        loadingOverlay.classList.add('hidden');
        
        // Re-enable all interactive elements
        interactiveElements.forEach(element => {
            if (element) {
                element.disabled = false;
            }
        });
        
        // Re-enable removal buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.style.pointerEvents = 'auto';
        });
    }
}

// Theme Management - Persist theme across pages with localStorage
function applyTheme() {
    const currentTheme = localStorage.getItem('postboyTheme') || 'dark-mode';
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');
    
    // Apply saved theme
    if (currentTheme === 'light-mode') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        
        // Toggle highlight.js themes
        hljsDarkTheme.disabled = true;
        hljsLightTheme.disabled = false;
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        
        // Toggle highlight.js themes
        hljsDarkTheme.disabled = false;
        hljsLightTheme.disabled = true;
    }
    
    // Sync sidebar theme toggle button icon
    if (sidebarThemeToggleBtn) {
        const sidebarIcon = sidebarThemeToggleBtn.querySelector('i');
        if (currentTheme === 'light-mode') {
            sidebarIcon.classList.remove('fa-moon');
            sidebarIcon.classList.add('fa-sun');
        } else {
            sidebarIcon.classList.remove('fa-sun');
            sidebarIcon.classList.add('fa-moon');
        }
    }
}

// Method Change Handler - Update UI based on selected method
requestMethodSelect.addEventListener('change', () => {
    const method = requestMethodSelect.value;
    const methodConfig = HTTP_METHODS[method];
    
    // Toggle body tab based on whether the method can have a body
    if (methodConfig && !methodConfig.hasBody) {
        // If method doesn't support body, select the params tab
        document.querySelector('.tab-btn[data-tab="params"]').click();
        
        // Find the body tab button and disable it
        const bodyTabBtn = document.querySelector('.tab-btn[data-tab="body"]');
        bodyTabBtn.classList.add('disabled');
        bodyTabBtn.style.opacity = '0.5';
        bodyTabBtn.style.cursor = 'not-allowed';
        bodyTabBtn.title = `${method} requests don't support a request body`;
    } else {
        // Re-enable the body tab
        const bodyTabBtn = document.querySelector('.tab-btn[data-tab="body"]');
        bodyTabBtn.classList.remove('disabled');
        bodyTabBtn.style.opacity = '1';
        bodyTabBtn.style.cursor = 'pointer';
        bodyTabBtn.title = '';
    }
});

// Tab Navigation
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Skip if tab is disabled
        if (btn.classList.contains('disabled')) {
            return;
        }
        
        const tabId = btn.getAttribute('data-tab');
        const tabContentId = `${tabId}-tab`;
        
        // Get the parent tab container
        const tabContainer = btn.closest('.tabs, .response-tabs');
        
        // Remove active class from all tabs in this container
        tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        tabContainer.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and its content
        btn.classList.add('active');
        document.getElementById(tabContentId)?.classList.add('active');
    });
});

// Add Key-Value Pair Function
function addKeyValuePair(container, removeBtnHandler) {
    const pairDiv = document.createElement('div');
    pairDiv.className = 'key-value-pair';
    
    const keyInput = document.createElement('input');
    keyInput.type = 'text';
    keyInput.className = 'key-input';
    keyInput.placeholder = 'Key';
    
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className = 'value-input';
    valueInput.placeholder = 'Value';
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.addEventListener('click', removeBtnHandler || function() {
        pairDiv.remove();
    });
    
    pairDiv.appendChild(keyInput);
    pairDiv.appendChild(valueInput);
    pairDiv.appendChild(removeBtn);
    
    // Insert before the add button
    const addButton = container.querySelector('.add-btn');
    container.insertBefore(pairDiv, addButton);
    
    // Add newly created elements to interactive elements array
    interactiveElements.push(keyInput, valueInput, removeBtn);
    
    return pairDiv;
}

// Add Parameter
addParamBtn.addEventListener('click', () => {
    addKeyValuePair(paramsContainer);
});

// Add Header
addHeaderBtn.addEventListener('click', () => {
    addKeyValuePair(headersContainer);
});

// Add Form Field
addFormBtn.addEventListener('click', () => {
    addKeyValuePair(bodyFormContainer);
});

// Body Type Change Handler
bodyTypeSelect.addEventListener('change', () => {
    const selectedType = bodyTypeSelect.value;
    
    if (selectedType === 'none') {
        bodyFormContainer.classList.add('hidden');
        bodyRawContainer.classList.add('hidden');
    } else if (selectedType === 'raw') {
        bodyFormContainer.classList.add('hidden');
        bodyRawContainer.classList.remove('hidden');
    } else {
        // form-data or x-www-form-urlencoded
        bodyFormContainer.classList.remove('hidden');
        bodyRawContainer.classList.add('hidden');
    }
});

// JSON Beautify for textarea
jsonBodyTextarea.addEventListener('input', function() {
    try {
        // Only attempt to format if it looks like JSON (starts with { or [)
        const value = this.value.trim();
        if ((value.startsWith('{') || value.startsWith('[')) && value.length > 1) {
            const formatted = JSON.stringify(JSON.parse(value), null, 2);
            // Only update if the parsed JSON is different from current value
            // to avoid moving cursor during typing
            if (formatted !== value) {
                const cursorPosition = this.selectionStart;
                this.value = formatted;
                this.setSelectionRange(cursorPosition, cursorPosition);
            }
        }
    } catch (e) {
        // Not valid JSON yet, do nothing
    }
});

// Helper: Get Key-Value Pairs
function getKeyValuePairs(container) {
    const pairs = {};
    const keyValuePairDivs = container.querySelectorAll('.key-value-pair');
    
    keyValuePairDivs.forEach(div => {
        const key = div.querySelector('.key-input').value.trim();
        const value = div.querySelector('.value-input').value.trim();
        
        if (key) {
            pairs[key] = value;
        }
    });
    
    return pairs;
}

// Build URL with Query Parameters
function buildUrl(baseUrl, params) {
    if (Object.keys(params).length === 0) return baseUrl;
    
    const url = new URL(baseUrl);
    
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value);
    }
    
    return url.toString();
}

// Format JSON with Indentation and Syntax Highlighting
function formatJSON(json) {
    try {
        return JSON.stringify(JSON.parse(json), null, 2);
    } catch (e) {
        return json;
    }
}

// Format Headers for Display
function formatHeaders(headers) {
    let result = '';
    headers.forEach((value, key) => {
        result += `${key}: ${value}\n`;
    });
    return result;
}

// Apply syntax highlighting
function applySyntaxHighlighting(element, language, content) {
    element.textContent = content;
    element.className = language;
    hljs.highlightElement(element);
}

// Copy response to clipboard
copyResponseBtn.addEventListener('click', () => {
    // Determine which response tab is active to know what to copy
    const activeTab = document.querySelector('.response-tabs .tab-btn.active').getAttribute('data-tab');
    let textToCopy = '';
    
    if (activeTab === 'response-body') {
        textToCopy = responseBodyElem.textContent;
        if (textToCopy === DEFAULT_BODY_MESSAGE) {
            alert('No response to copy. Make a request first.');
            return;
        }
    } else if (activeTab === 'response-headers') {
        textToCopy = responseHeadersElem.textContent;
        if (textToCopy === DEFAULT_HEADERS_MESSAGE) {
            alert('No response headers to copy. Make a request first.');
            return;
        }
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Visual feedback
            copyResponseBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyResponseBtn.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyResponseBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                copyResponseBtn.classList.remove('copied');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy to clipboard');
        });
});

// Auth Type Change Handler
authTypeSelect.addEventListener('change', () => {
    const selectedType = authTypeSelect.value;
    
    if (selectedType === 'none') {
        bearerContainer.classList.add('hidden');
        basicContainer.classList.add('hidden');
    } else if (selectedType === 'bearer') {
        bearerContainer.classList.remove('hidden');
        basicContainer.classList.add('hidden');
    }
});

// Send Request
async function sendRequest() {
    // Set loading state
    setLoading(true);
    
    // Clear previous response
    statusCodeElem.textContent = '';
    statusCodeElem.className = '';
    responseTimeElem.textContent = '';
    
    try {
        const method = requestMethodSelect.value;
        let url = urlInput.value.trim();
    // replace environment variables in URL
    url = replaceEnvVars(url);
        
        // Validate URL
        if (!url) {
            alert('Please enter a URL');
            setLoading(false);
            return;
        }
        
        // Add https:// if not present
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        // Get method configuration
        const methodConfig = HTTP_METHODS[method] || { hasBody: false, useParams: true };
        
        // Get parameters
        const params = getKeyValuePairs(paramsContainer);
        // replace env variables in params
        const paramsReplaced = {};
        for (const [k, v] of Object.entries(params)) {
            const key = replaceEnvVars(k);
            const val = replaceEnvVars(v);
            if (key) paramsReplaced[key] = val;
        }
        
        // Build URL with query parameters for methods that use URL params
        if (methodConfig.useParams) {
            url = buildUrl(url, paramsReplaced);
        }
        
        // Get headers
        let headers = getKeyValuePairs(headersContainer);
        // replace env vars in headers
        const headersReplaced = {};
        for (const [k, v] of Object.entries(headers)) {
            const key = replaceEnvVars(k);
            const val = replaceEnvVars(v);
            if (key) headersReplaced[key] = val;
        }
        headers = headersReplaced;
        
        // Add authentication headers if needed
        const authType = authTypeSelect.value;
        if (authType === 'bearer') {
            const token = bearerTokenInput.value.trim();
            if (token) {
                headers['Authorization'] = `Bearer ${replaceEnvVars(token)}`;
            }
        } else if (authType === 'basic') {
            const username = basicUsernameInput.value.trim();
            const password = basicPasswordInput.value;
            if (username || password) {
                try {
                    const encoded = btoa(`${replaceEnvVars(username)}:${replaceEnvVars(password)}`);
                    headers['Authorization'] = `Basic ${encoded}`;
                } catch (e) {
                    // btoa may throw if non-latin1 characters are used; fall back to utf-8 handling
                    const utf8ToBase64 = str => {
                        return btoa(unescape(encodeURIComponent(str)));
                    };
                    headers['Authorization'] = `Basic ${utf8ToBase64(`${replaceEnvVars(username)}:${replaceEnvVars(password)}`)}`;
                }
            }
        }
        
        // Prepare request options
        const options = {
            method,
            headers: new Headers(headers),
        };
        
        // Add body for request methods that support it
        if (methodConfig.hasBody) {
            const bodyType = bodyTypeSelect.value;
            
            if (bodyType === 'raw') {
                const jsonBody = jsonBodyTextarea.value.trim();
                if (jsonBody) {
                    // replace env vars in raw body
                    const replacedBody = replaceEnvVars(jsonBody);
                    // Validate JSON earlier and show friendly error if invalid
                    try {
                        JSON.parse(replacedBody);
                        options.headers.set('Content-Type', 'application/json');
                        options.body = replacedBody;
                    } catch (err) {
                        // Invalid JSON - surface friendly message and abort
                        setLoading(false);
                        statusCodeElem.textContent = 'Invalid JSON';
                        statusCodeElem.classList.add('error');
                        responseBodyElem.textContent = 'The request body contains invalid JSON. Please fix the JSON before sending.';
                        return;
                    }
                }
            } else if (bodyType === 'form-data') {
                const formData = new FormData();
                const formPairs = getKeyValuePairs(bodyFormContainer);
                
                for (const [key, value] of Object.entries(formPairs)) {
                    formData.append(replaceEnvVars(key), replaceEnvVars(value));
                }
                
                options.body = formData;
            } else if (bodyType === 'x-www-form-urlencoded') {
                const formPairs = getKeyValuePairs(bodyFormContainer);
                const urlEncodedData = new URLSearchParams();
                
                for (const [key, value] of Object.entries(formPairs)) {
                    urlEncodedData.append(replaceEnvVars(key), replaceEnvVars(value));
                }
                
                options.headers.set('Content-Type', 'application/x-www-form-urlencoded');
                options.body = urlEncodedData;
            }
        }
        
    // apply CORS proxy if enabled
    url = applyCorsProxy(url);

    // Start timing
        const startTime = Date.now();
        
        // Send request
        let response;
        try {
            response = await fetch(url, options);
        } catch (networkError) {
            // Network failure (CORS, DNS, offline, etc.) - show friendly message
            console.error('Network error when sending request:', networkError);
            statusCodeElem.textContent = 'Network Error';
            statusCodeElem.classList.add('error');
            responseTimeElem.textContent = '';
            responseHeadersElem.textContent = '';
            responseBodyElem.textContent = 'Network error: ' + (networkError.message || 'Failed to send request. Check the URL or your network/CORS settings.');
            // Save to history as failed
            saveHistoryEntry({
                method,
                url,
                params,
                headers,
                auth: { type: authType, token: authType === 'bearer' ? bearerTokenInput.value.trim() : '' },
                body: options.body || null,
                status: 'network_error',
                timestamp: Date.now()
            });
            setLoading(false);
            return;
        }
        
        // Calculate response time
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        // Update status code with color
        statusCodeElem.textContent = response.status;
        if (response.ok) {
            statusCodeElem.classList.add('success');
        } else {
            statusCodeElem.classList.add('error');
        }
        
        // Update response time
        responseTimeElem.textContent = `${responseTime} ms`;
        
        // Get response headers
        const responseHeaders = formatHeaders(response.headers);
        applySyntaxHighlighting(responseHeadersElem, 'http', responseHeaders);
        
        let responseBody = '';
        let responseType = 'text';

        // Handle response body (special case for HEAD method which has no body)
        if (methodConfig.bodylessResponse) {
            responseBodyElem.textContent = "No response body for HEAD requests";
            responseBody = "No response body for HEAD requests";
            if (responseRawElem) responseRawElem.textContent = responseBody;
            if (responsePreviewFrame) responsePreviewFrame.srcdoc = '';
        } else {
            try {
                const contentType = (response.headers.get('content-type') || '').toLowerCase();
                // read as text first (we'll parse JSON if needed)
                const rawText = await response.text();
                responseBody = rawText;

                // Raw view
                if (responseRawElem) responseRawElem.textContent = rawText;

                // Pretty / syntax-highlighted view
                if (contentType.includes('application/json')) {
                    responseType = 'json';
                    applySyntaxHighlighting(responseBodyElem, 'json', formatJSON(rawText));
                } else if (contentType.includes('text/html') || contentType.includes('application/xml') || contentType.includes('text/xml')) {
                    if (contentType.includes('html')) responseType = 'html'; else responseType = 'xml';
                    applySyntaxHighlighting(responseBodyElem, responseType, rawText);
                    if (responsePreviewFrame) responsePreviewFrame.srcdoc = rawText;
                } else if (contentType.includes('text/css')) {
                    responseType = 'css';
                    applySyntaxHighlighting(responseBodyElem, 'css', rawText);
                } else if (contentType.includes('application/javascript') || contentType.includes('text/javascript')) {
                    responseType = 'javascript';
                    applySyntaxHighlighting(responseBodyElem, 'javascript', rawText);
                } else {
                    // Try to detect JSON
                    try {
                        JSON.parse(rawText);
                        responseType = 'json';
                        applySyntaxHighlighting(responseBodyElem, 'json', formatJSON(rawText));
                    } catch (e) {
                        responseType = 'plaintext';
                        applySyntaxHighlighting(responseBodyElem, 'plaintext', rawText);
                    }
                }
            } catch (error) {
                responseBody = 'Error parsing response body: ' + error.message;
                responseType = 'error';
                responseBodyElem.textContent = responseBody;
                if (responseRawElem) responseRawElem.textContent = responseBody;
            }
        }
        
        // No more auto-save functionality
        // Save successful request into history
        saveHistoryEntry({
            method,
            url,
            params,
            headers,
            auth: { type: authType, token: authType === 'bearer' ? bearerTokenInput.value.trim() : '' },
            body: options.body || null,
            status: response.status,
            timestamp: Date.now()
        });
        
    } catch (error) {
        console.error('Request error:', error);
        statusCodeElem.textContent = 'Error';
        statusCodeElem.classList.add('error');
        responseBodyElem.textContent = error.message;
        responseHeadersElem.textContent = '';
    } finally {
        // Reset loading state regardless of success or failure
        setLoading(false);
    }
}

// Send Request Button Click Handler
sendBtn.addEventListener('click', sendRequest);

// Initialize - make sure one pair exists in each container
if (paramsContainer.querySelectorAll('.key-value-pair').length === 0) {
    addKeyValuePair(paramsContainer);
}

if (headersContainer.querySelectorAll('.key-value-pair').length === 0) {
    addKeyValuePair(headersContainer);
}

// Handle CORS Warning
function handleCorsWarning() {
    const warningElem = document.createElement('div');
    warningElem.className = 'cors-warning';
    warningElem.innerHTML = `
        <div class="cors-warning-content">
            <p>⚠️ <strong>CORS Warning:</strong> Browser security may block cross-origin requests. 
            For testing APIs that don't support CORS, consider using a CORS proxy or testing in an environment 
            that allows cross-origin requests.</p>
            <button class="cors-close-btn" aria-label="Close CORS warning">×</button>
        </div>
    `;
    
    // Add styles inline to ensure they're applied
    warningElem.style.backgroundColor = '#fff3cd';
    warningElem.style.color = '#856404';
    warningElem.style.padding = '0.75rem';
    warningElem.style.borderRadius = '4px';
    warningElem.style.marginBottom = '1rem';
    warningElem.style.position = 'relative';
    
    // Add the warning to the DOM
    document.querySelector('main').prepend(warningElem);
    
    // Add event listener to close button
    const closeBtn = warningElem.querySelector('.cors-close-btn');
    closeBtn.style.position = 'absolute';
    closeBtn.style.right = '10px';
    closeBtn.style.top = '50%';
    closeBtn.style.transform = 'translateY(-50%)';
    closeBtn.style.backgroundColor = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#856404';
    closeBtn.style.padding = '0 10px';
    
    closeBtn.addEventListener('click', function() {
        warningElem.remove();
    });
    
    // Add styles to the warning content
    const contentDiv = warningElem.querySelector('.cors-warning-content');
    contentDiv.style.display = 'flex';
    contentDiv.style.justifyContent = 'space-between';
    contentDiv.style.alignItems = 'center';
    
    // Add padding-right to the paragraph to make space for the close button
    warningElem.querySelector('p').style.paddingRight = '40px';
}

// Show CORS warning on load
handleCorsWarning();

// Load additional languages for Highlight.js if needed
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme from localStorage
    applyTheme();
    
    // Initialize auth type UI
    authTypeSelect.dispatchEvent(new Event('change'));
    
    // Initialize saved endpoints sidebar
    initializeSidebarState();
    renderSavedEndpoints();
    
    // Add syntax highlighting to JSON input when focus is lost
    jsonBodyTextarea.addEventListener('blur', function() {
        try {
            const value = this.value.trim();
            if (value && (value.startsWith('{') || value.startsWith('['))) {
                this.value = formatJSON(value);
            }
        } catch (e) {
            // Not valid JSON, ignore
        }
    });
    
    // Hide loading overlay initially
    setLoading(false);
    
    // Initialize method handling
    requestMethodSelect.dispatchEvent(new Event('change'));
    
    // Add event listener for response tab changes to update the copy button state
    document.querySelectorAll('.response-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset the copy button text when switching tabs
            copyResponseBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            copyResponseBtn.classList.remove('copied');
        });
    });
    
    // Handle window resize for responsive sidebar
    window.addEventListener('resize', () => {
        // On smaller screens, make sure sidebar is properly adjusted for mobile view
        if (window.innerWidth <= 768) {
            // For mobile view, sidebar takes full width when open
            if (!savedEndpointsSidebar.classList.contains('collapsed')) {
                mainContainer.classList.add('with-saved-sidebar');
            } else {
                mainContainer.classList.remove('with-saved-sidebar');
            }
        } else {
            // For desktop view, adjust main container margin when sidebar is open
            if (!savedEndpointsSidebar.classList.contains('collapsed')) {
                mainContainer.classList.add('with-saved-sidebar');
            } else {
                mainContainer.classList.remove('with-saved-sidebar');
            }
        }
    });
});

// Initialize sidebar state (closed by default on all screen sizes)
function initializeSidebarState() {
    // Always start with the sidebar collapsed regardless of screen size
    savedEndpointsSidebar.classList.add('collapsed');
    mainContainer.classList.remove('with-saved-sidebar');
}

// Saved Endpoints Logic
let savedEndpoints = JSON.parse(localStorage.getItem('postboySavedEndpoints')) || [];

// Filter out any existing auto-saved entries
savedEndpoints = savedEndpoints.filter(endpoint => !endpoint.autoSaved);
localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));

// Save the current endpoint configuration
function saveEndpoint() {
    const endpointUrl = urlInput.value.trim();
    
    if (!endpointUrl) {
        alert('Please enter a URL before saving');
        return;
    }
    
    // Get a name for the endpoint
    const endpointName = prompt('Enter a name for this endpoint', endpointUrl);
    
    if (!endpointName) return; // User cancelled
    
    // Check if an endpoint with this name already exists
    const existingIndex = savedEndpoints.findIndex(ep => ep.name === endpointName);
    
    if (existingIndex !== -1) {
        const overwrite = confirm(`An endpoint named "${endpointName}" already exists. Do you want to overwrite it?`);
        if (!overwrite) return;
    }
    
    // Get response data if available
    let responseData = null;
    if (statusCodeElem.textContent) {
        responseData = {
            status: parseInt(statusCodeElem.textContent) || 0,
            time: parseInt(responseTimeElem.textContent) || 0,
            headers: responseHeadersElem.textContent,
            body: responseBodyElem.textContent,
            type: responseBodyElem.className
        };
    }
    
    // Get optional collection/folder name
    const collectionName = prompt('Enter a collection/folder name (optional)', '');

    // Create an endpoint object with all current configuration
    const endpoint = {
        name: endpointName,
        method: requestMethodSelect.value,
        url: endpointUrl,
        params: getKeyValuePairs(paramsContainer),
        headers: getKeyValuePairs(headersContainer),
        auth: {
            type: authTypeSelect.value,
            token: bearerTokenInput.value.trim()
        },
        body: {
            type: bodyTypeSelect.value,
            rawJson: jsonBodyTextarea.value.trim(),
            formData: bodyTypeSelect.value.includes('form') ? getKeyValuePairs(bodyFormContainer) : {}
        },
        response: responseData,
        collection: collectionName ? collectionName.trim() : null,
        timestamp: Date.now()
    };
    
    // Add or update in saved endpoints array
    if (existingIndex !== -1) {
        savedEndpoints[existingIndex] = endpoint;
    } else {
        savedEndpoints.push(endpoint);
    }
    
    // Save to localStorage
    localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
    
    // Update the UI
    renderSavedEndpoints();
}

// Load a saved endpoint configuration
function loadEndpoint(endpoint) {
    // Set method
    requestMethodSelect.value = endpoint.method;
    requestMethodSelect.dispatchEvent(new Event('change'));
    
    // Set URL
    urlInput.value = endpoint.url;
    
    // Set params
    clearContainer(paramsContainer);
    if (Object.keys(endpoint.params || {}).length > 0) {
        for (const [key, value] of Object.entries(endpoint.params)) {
            const pairDiv = addKeyValuePair(paramsContainer);
            pairDiv.querySelector('.key-input').value = key;
            pairDiv.querySelector('.value-input').value = value;
        }
    } else {
        addKeyValuePair(paramsContainer);
    }
    
    // Set headers
    clearContainer(headersContainer);
    if (Object.keys(endpoint.headers || {}).length > 0) {
        for (const [key, value] of Object.entries(endpoint.headers)) {
            const pairDiv = addKeyValuePair(headersContainer);
            pairDiv.querySelector('.key-input').value = key;
            pairDiv.querySelector('.value-input').value = value;
        }
    } else {
        addKeyValuePair(headersContainer);
    }
    
    // Set auth
    if (endpoint.auth) {
        authTypeSelect.value = endpoint.auth.type || 'none';
        authTypeSelect.dispatchEvent(new Event('change'));
        
        if (endpoint.auth.type === 'bearer') {
            bearerTokenInput.value = endpoint.auth.token || '';
        }
    }
    
    // Set body
    if (endpoint.body) {
        bodyTypeSelect.value = endpoint.body.type || 'none';
        bodyTypeSelect.dispatchEvent(new Event('change'));
        
        if (endpoint.body.type === 'raw') {
            jsonBodyTextarea.value = endpoint.body.rawJson || '';
        } else if (endpoint.body.type.includes('form')) {
            clearContainer(bodyFormContainer);
            if (Object.keys(endpoint.body.formData || {}).length > 0) {
                for (const [key, value] of Object.entries(endpoint.body.formData)) {
                    const pairDiv = addKeyValuePair(bodyFormContainer);
                    pairDiv.querySelector('.key-input').value = key;
                    pairDiv.querySelector('.value-input').value = value;
                }
            } else {
                addKeyValuePair(bodyFormContainer);
            }
        }
    }
    
    // Load response if available
    if (endpoint.response) {
        // Set status code
        statusCodeElem.textContent = endpoint.response.status;
        statusCodeElem.className = '';
        if (endpoint.response.status >= 200 && endpoint.response.status < 400) {
            statusCodeElem.classList.add('success');
        } else {
            statusCodeElem.classList.add('error');
        }
        
        // Set response time
        responseTimeElem.textContent = `${endpoint.response.time} ms`;
        
        // Set response headers
        applySyntaxHighlighting(responseHeadersElem, 'http', endpoint.response.headers);
        
        // Set response body based on type
        if (endpoint.response.type === 'json') {
            applySyntaxHighlighting(responseBodyElem, 'json', formatJSON(endpoint.response.body));
        } else {
            applySyntaxHighlighting(responseBodyElem, endpoint.response.type, endpoint.response.body);
        }
    } else {
        // Clear response if not available
        statusCodeElem.textContent = '';
        statusCodeElem.className = '';
        responseTimeElem.textContent = '';
        responseBodyElem.textContent = DEFAULT_BODY_MESSAGE;
        responseHeadersElem.textContent = DEFAULT_HEADERS_MESSAGE;
    }
    
    // Switch to params tab
    document.querySelector('.tab-btn[data-tab="params"]').click();
}

// Delete a saved endpoint
function deleteEndpoint(index, endpoint) {
    if (confirm(`Are you sure you want to delete "${endpoint.name}"?`)) {
        // Find the actual index of this endpoint in the original array
        const actualIndex = savedEndpoints.findIndex(ep => 
            ep.name === endpoint.name && 
            ep.url === endpoint.url && 
            ep.timestamp === endpoint.timestamp);
        
        if (actualIndex !== -1) {
            savedEndpoints.splice(actualIndex, 1);
            localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
            renderSavedEndpoints();
        }
    }
}

// Helper function to clear a container's key-value pairs
function clearContainer(container) {
    const pairs = container.querySelectorAll('.key-value-pair');
    pairs.forEach(pair => pair.remove());
}

// Render saved endpoints in the sidebar
function renderSavedEndpoints() {
    savedEndpointsList.innerHTML = '';
    
    if (savedEndpoints.length === 0) {
        noSavedEndpointsMsg.style.display = 'block';
        return;
    }
    
    noSavedEndpointsMsg.style.display = 'none';
    
    // Group by collections/folders (collection may be null)
    const grouped = {};
    savedEndpoints.forEach(ep => {
        const key = ep.collection || 'Uncategorized';
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(ep);
    });

    // For each collection render a heading and list
    Object.keys(grouped).forEach(collectionName => {
        const colHeader = document.createElement('div');
        colHeader.className = 'collection-header';
        colHeader.textContent = collectionName;

        const colList = document.createElement('ul');
        colList.className = 'collection-list';

        // Sort by recent
        const items = grouped[collectionName].sort((a, b) => b.timestamp - a.timestamp);

        items.forEach((endpoint, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'saved-endpoint-item';

            const itemHeader = document.createElement('div');
            itemHeader.className = 'saved-endpoint-item-header';

            const methodSpan = document.createElement('span');
            methodSpan.className = `saved-endpoint-method ${endpoint.method.toLowerCase()}`;
            methodSpan.textContent = endpoint.method;

            const nameDiv = document.createElement('div');
            nameDiv.className = 'saved-endpoint-name';
            nameDiv.textContent = endpoint.name || endpoint.url;
            nameDiv.title = endpoint.name || endpoint.url;

            itemHeader.appendChild(methodSpan);
            itemHeader.appendChild(nameDiv);

            const urlSpan = document.createElement('span');
            urlSpan.className = 'saved-endpoint-url';
            let displayUrl = endpoint.url;
            if (displayUrl.length > 40) {
                const urlParts = displayUrl.split('//');
                if (urlParts.length > 1) {
                    const domainPath = urlParts[1].split('/');
                    if (domainPath.length > 1) {
                        displayUrl = urlParts[0] + '//' + domainPath[0] + '/...';
                    }
                } else {
                    displayUrl = displayUrl.substring(0, 37) + '...';
                }
            }
            urlSpan.textContent = displayUrl;
            urlSpan.title = endpoint.url;

            if (endpoint.response && endpoint.response.status) {
                const statusBadge = document.createElement('span');
                statusBadge.className = 'saved-endpoint-status';
                statusBadge.textContent = endpoint.response.status;
                if (endpoint.response.status >= 200 && endpoint.response.status < 400) {
                    statusBadge.classList.add('success');
                } else {
                    statusBadge.classList.add('error');
                }
                listItem.appendChild(statusBadge);
            }

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'saved-endpoint-actions';

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'save-endpoint-action-btn delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.title = 'Delete Endpoint';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteEndpoint(index, endpoint);
            });

            actionsDiv.appendChild(deleteBtn);

            listItem.appendChild(itemHeader);
            listItem.appendChild(urlSpan);
            listItem.appendChild(actionsDiv);

            listItem.addEventListener('click', () => {
                loadEndpoint(endpoint);
                endpoint.timestamp = Date.now();
                localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
            });

            colList.appendChild(listItem);
        });

        savedEndpointsList.appendChild(colHeader);
        savedEndpointsList.appendChild(colList);
    });
}

// --- Environments ---
let environments = JSON.parse(localStorage.getItem('postboyEnvironments')) || {};
let currentEnvName = localStorage.getItem('postboyCurrentEnv') || null;

function saveEnvironments() {
    localStorage.setItem('postboyEnvironments', JSON.stringify(environments));
}

function renderEnvironmentOptions() {
    if (!envSelect) return;
    envSelect.innerHTML = '';
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'No Environment';
    envSelect.appendChild(defaultOpt);

    Object.keys(environments).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        if (name === currentEnvName) opt.selected = true;
        envSelect.appendChild(opt);
    });
}

function manageEnvironments() {
    // simple prompt-based editor: list envs and allow create/edit/delete
    const names = Object.keys(environments);
    const action = prompt('Environments:\n' + (names.length ? names.join('\n') : '(none)') + '\n\nType:\n  new NAME - to create\n  edit NAME - to edit JSON\n  delete NAME - to delete\n\nOr Cancel');
    if (!action) return;
    const parts = action.split(' ');
    const cmd = parts[0];
    const name = parts.slice(1).join(' ').trim();
    if (cmd === 'new' && name) {
        if (environments[name]) { alert('Environment exists'); return; }
        const raw = prompt('Enter variables as JSON, e.g. {"baseUrl":"https://api.example.com"}');
        try { environments[name] = raw ? JSON.parse(raw) : {}; saveEnvironments(); renderEnvironmentOptions(); } catch (e) { alert('Invalid JSON'); }
    } else if (cmd === 'edit' && name) {
        if (!environments[name]) { alert('Not found'); return; }
        const raw = prompt('Edit variables as JSON', JSON.stringify(environments[name], null, 2));
        try { environments[name] = raw ? JSON.parse(raw) : {}; saveEnvironments(); renderEnvironmentOptions(); } catch (e) { alert('Invalid JSON'); }
    } else if (cmd === 'delete' && name) {
        if (!environments[name]) { alert('Not found'); return; }
        if (!confirm('Delete environment ' + name + '?')) return;
        delete environments[name]; saveEnvironments(); if (currentEnvName === name) { currentEnvName = null; localStorage.removeItem('postboyCurrentEnv'); } renderEnvironmentOptions();
    } else {
        alert('Unknown command');
    }
}

// wire env select change
if (envSelect) {
    envSelect.addEventListener('change', () => {
        currentEnvName = envSelect.value || null;
        localStorage.setItem('postboyCurrentEnv', currentEnvName || '');
    });
}

if (manageEnvsBtn) manageEnvsBtn.addEventListener('click', manageEnvironments);

function replaceEnvVars(str) {
    if (!str || !currentEnvName || !environments[currentEnvName]) return str;
    return str.replace(/{{\s*([^}]+)\s*}}/g, (m, key) => {
        return environments[currentEnvName][key] != null ? environments[currentEnvName][key] : m;
    });
}

// --- Export / Import ---
if (exportBtn) {
    exportBtn.addEventListener('click', () => {
        const payload = {
            info: { name: 'Postboy Export', exportedAt: new Date().toISOString() },
            savedEndpoints,
            environments
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'postboy-export-' + Date.now() + '.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });
}

if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const data = JSON.parse(ev.target.result);
                const incoming = data.savedEndpoints || data.items || [];
                const incomingEnvs = data.environments || data.env || data.environments || {};
                if (incoming.length === 0 && Object.keys(incomingEnvs).length === 0) { alert('No endpoints or environments found'); return; }
                if (!confirm('Import will merge into existing saved endpoints and environments. Continue?')) return;
                // merge endpoints (keep timestamps)
                incoming.forEach(ep => { ep.timestamp = ep.timestamp || Date.now(); savedEndpoints.push(ep); });
                // merge envs
                Object.keys(incomingEnvs).forEach(k => { environments[k] = incomingEnvs[k]; });
                saveEnvironments();
                localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
                renderSavedEndpoints();
                renderEnvironmentOptions();
                alert('Import complete');
            } catch (err) {
                alert('Failed to import: ' + err.message);
            }
        };
        reader.readAsText(f);
    });
}

if (importBtn && importFileInput) {
    importBtn.addEventListener('click', () => importFileInput.click());
}

// --- CORS Proxy handling ---
function applyCorsProxy(url) {
    try {
        const enabled = corsProxyToggle ? corsProxyToggle.checked : false;
        const proxy = corsProxyUrlInput ? corsProxyUrlInput.value.trim() : '';
        if (enabled && proxy) {
            // ensure proxy ends with '/'
            const p = proxy.endsWith('/') ? proxy : proxy + '/';
            return p + url;
        }
    } catch (e) {}
    return url;
}

// --- Response view tabs ---
const respViewBtns = document.querySelectorAll('.resp-view-btn');
const responseRawElem = document.getElementById('response-raw');
const responsePreviewFrame = document.getElementById('response-preview-frame');

function setActiveResponseView(view) {
    document.querySelectorAll('.resp-view-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.response-views pre, .response-views .response-preview').forEach(el => el.classList.add('hidden'));
    const btn = document.querySelector(`.resp-view-btn[data-view="${view}"]`);
    if (btn) btn.classList.add('active');
    if (view === 'raw') document.querySelector('.response-raw').classList.remove('hidden');
    else if (view === 'pretty') document.querySelector('.response-pretty').classList.remove('hidden');
    else if (view === 'preview') document.querySelector('.response-preview').classList.remove('hidden');
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.resp-view-btn');
    if (btn) {
        setActiveResponseView(btn.getAttribute('data-view'));
    }
});

// Save Endpoint Button Click Handler
saveEndpointBtn.addEventListener('click', saveEndpoint);

// Header Saved Endpoints Button
headerSavedSidebarBtn.addEventListener('click', () => {
    savedEndpointsSidebar.classList.toggle('collapsed');
    mainContainer.classList.toggle('with-saved-sidebar');
});

// --- Request History ---
let requestHistory = JSON.parse(localStorage.getItem('postboyRequestHistory')) || [];
const requestHistoryList = document.getElementById('request-history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

function saveHistoryEntry(entry) {
    try {
        requestHistory.push(entry);
        // keep history bounded to last 100 entries
        if (requestHistory.length > 100) requestHistory.shift();
        localStorage.setItem('postboyRequestHistory', JSON.stringify(requestHistory));
        renderRequestHistory();
    } catch (e) {
        console.error('Failed to save history entry', e);
    }
}

function renderRequestHistory() {
    if (!requestHistoryList) return;
    requestHistoryList.innerHTML = '';
    if (requestHistory.length === 0) {
        const li = document.createElement('li');
        li.className = 'history-empty';
        li.textContent = 'No history yet';
        requestHistoryList.appendChild(li);
        return;
    }

    // show most recent first
    const items = [...requestHistory].reverse();
    items.forEach((h, idx) => {
        const li = document.createElement('li');
        li.className = 'history-item';

        const textSpan = document.createElement('span');
        textSpan.textContent = `${h.method} ${h.url} · ${new Date(h.timestamp).toLocaleString()}`;
        textSpan.title = h.url;

        const actions = document.createElement('div');
        actions.className = 'history-actions';

        const loadBtn = document.createElement('button');
        loadBtn.className = 'history-action-btn';
        loadBtn.textContent = 'Load';
        loadBtn.title = 'Load into request form';
        loadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            loadHistoryItem(h);
        });

        const saveBtn = document.createElement('button');
        saveBtn.className = 'history-action-btn';
        saveBtn.textContent = 'Save';
        saveBtn.title = 'Save this history item to a collection';
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            saveHistoryItemToCollection(h);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'history-action-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.title = 'Delete this history item';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHistoryItem(requestHistory.length - 1 - idx);
        });

        actions.appendChild(loadBtn);
        actions.appendChild(saveBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(textSpan);
        li.appendChild(actions);

        // clicking anywhere on the item loads it
        li.addEventListener('click', () => {
            loadHistoryItem(h);
        });

        requestHistoryList.appendChild(li);
    });
}

function deleteHistoryItem(index) {
    if (index < 0 || index >= requestHistory.length) return;
    if (!confirm('Delete this history entry?')) return;
    requestHistory.splice(index, 1);
    localStorage.setItem('postboyRequestHistory', JSON.stringify(requestHistory));
    renderRequestHistory();
}

function saveHistoryItemToCollection(h) {
    const defaultName = `${h.method} ${h.url}`;
    const name = prompt('Name for saved endpoint', defaultName);
    if (!name) return;
    const collection = prompt('Collection name (optional)', '');

    const endpoint = {
        name,
        method: h.method,
        url: h.url,
        params: h.params || {},
        headers: h.headers || {},
        auth: h.auth || { type: 'none', token: '' },
        body: {
            type: typeof h.body === 'string' ? 'raw' : 'none',
            rawJson: typeof h.body === 'string' ? h.body : '',
            formData: {}
        },
        response: null,
        collection: collection ? collection.trim() : null,
        timestamp: Date.now()
    };

    savedEndpoints.push(endpoint);
    localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
    renderSavedEndpoints();
}

// New collection button handler - creates an empty placeholder endpoint to define collection
if (newCollectionBtn) {
    newCollectionBtn.addEventListener('click', () => {
        const col = prompt('Enter new collection name');
        if (!col) return;
        // Create a hidden placeholder endpoint as a way to make the collection appear
        const placeholder = {
            name: '(collection) ' + col,
            method: 'GET',
            url: '',
            params: {},
            headers: {},
            auth: { type: 'none', token: '' },
            body: { type: 'none', rawJson: '', formData: {} },
            response: null,
            collection: col.trim(),
            timestamp: Date.now()
        };
        savedEndpoints.push(placeholder);
        localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
        renderSavedEndpoints();
    });
}

// Manage collections - simple delete-all-in-collection flow
if (manageCollectionsBtn) {
    manageCollectionsBtn.addEventListener('click', () => {
        // list distinct collections
        const collections = Array.from(new Set(savedEndpoints.map(ep => ep.collection).filter(Boolean)));
        if (collections.length === 0) {
            alert('No collections available');
            return;
        }
        const chosen = prompt('Collections:\n' + collections.join('\n') + '\n\nEnter a collection name to DELETE all endpoints inside it (or Cancel)');
        if (!chosen) return;
        if (!collections.includes(chosen)) {
            alert('Collection not found');
            return;
        }
        if (!confirm(`Delete all endpoints in collection "${chosen}"? This cannot be undone.`)) return;
        savedEndpoints = savedEndpoints.filter(ep => ep.collection !== chosen);
        localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
        renderSavedEndpoints();
    });
}

function loadHistoryItem(h) {
    requestMethodSelect.value = h.method;
    requestMethodSelect.dispatchEvent(new Event('change'));
    urlInput.value = h.url;

    // Load params, headers, auth, body
    clearContainer(paramsContainer);
    if (h.params && Object.keys(h.params).length > 0) {
        for (const [k, v] of Object.entries(h.params)) {
            const pair = addKeyValuePair(paramsContainer);
            pair.querySelector('.key-input').value = k;
            pair.querySelector('.value-input').value = v;
        }
    } else {
        addKeyValuePair(paramsContainer);
    }

    clearContainer(headersContainer);
    if (h.headers && Object.keys(h.headers).length > 0) {
        for (const [k, v] of Object.entries(h.headers)) {
            const pair = addKeyValuePair(headersContainer);
            pair.querySelector('.key-input').value = k;
            pair.querySelector('.value-input').value = v;
        }
    } else {
        addKeyValuePair(headersContainer);
    }

    if (h.auth) {
        authTypeSelect.value = h.auth.type || 'none';
        authTypeSelect.dispatchEvent(new Event('change'));
        if (h.auth.type === 'bearer') bearerTokenInput.value = h.auth.token || '';
    }

    if (h.body) {
        // if it was raw JSON, place it back
        if (typeof h.body === 'string') {
            bodyTypeSelect.value = 'raw';
            bodyTypeSelect.dispatchEvent(new Event('change'));
            jsonBodyTextarea.value = h.body;
        }
    }
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm('Clear request history?')) {
            requestHistory = [];
            localStorage.removeItem('postboyRequestHistory');
            renderRequestHistory();
        }
    });
}

// render history on init
renderRequestHistory();

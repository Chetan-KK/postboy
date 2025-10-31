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

// Request History Elements
const historySidebar = document.querySelector('.history-sidebar');
const headerHistorySidebarBtn = document.getElementById('header-history-sidebar-btn');
const historyList = document.getElementById('history-list');
const noHistoryMsg = document.querySelector('.no-history');
const clearHistoryBtn = document.getElementById('clear-history-btn');

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
    } else if (selectedType === 'bearer') {
        bearerContainer.classList.remove('hidden');
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
        
        // Build URL with query parameters for methods that use URL params
        if (methodConfig.useParams) {
            url = buildUrl(url, params);
        }
        
        // Get headers
        const headers = getKeyValuePairs(headersContainer);
        
        // Add authentication headers if needed
        const authType = authTypeSelect.value;
        if (authType === 'bearer') {
            const token = bearerTokenInput.value.trim();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
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
                    options.headers.set('Content-Type', 'application/json');
                    options.body = jsonBody;
                }
            } else if (bodyType === 'form-data') {
                const formData = new FormData();
                const formPairs = getKeyValuePairs(bodyFormContainer);
                
                for (const [key, value] of Object.entries(formPairs)) {
                    formData.append(key, value);
                }
                
                options.body = formData;
            } else if (bodyType === 'x-www-form-urlencoded') {
                const formPairs = getKeyValuePairs(bodyFormContainer);
                const urlEncodedData = new URLSearchParams();
                
                for (const [key, value] of Object.entries(formPairs)) {
                    urlEncodedData.append(key, value);
                }
                
                options.headers.set('Content-Type', 'application/x-www-form-urlencoded');
                options.body = urlEncodedData;
            }
        }
        
        // Start timing
        const startTime = Date.now();
        
        // Send request
        const response = await fetch(url, options);
        
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
        
        // Variables to store response info
        let responseBody = '';
        let responseType = 'text';
        
        // Handle response body (special case for HEAD method which has no body)
        if (methodConfig.bodylessResponse) {
            responseBodyElem.textContent = "No response body for HEAD requests";
            responseBody = "No response body for HEAD requests";
        } else {
            // Get response body
            try {
                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    const jsonResponse = await response.json();
                    responseBody = JSON.stringify(jsonResponse);
                    responseType = 'json';
                    const formattedJson = formatJSON(responseBody);
                    applySyntaxHighlighting(responseBodyElem, 'json', formattedJson);
                } else if (contentType && (
                    contentType.includes('text/html') || 
                    contentType.includes('application/xml') || 
                    contentType.includes('text/xml')
                )) {
                    responseBody = await response.text();
                    if (contentType.includes('html')) {
                        responseType = 'html';
                    } else {
                        responseType = 'xml';
                    }
                    applySyntaxHighlighting(responseBodyElem, responseType, responseBody);
                } else if (contentType && contentType.includes('text/css')) {
                    responseBody = await response.text();
                    responseType = 'css';
                    applySyntaxHighlighting(responseBodyElem, 'css', responseBody);
                } else if (contentType && contentType.includes('application/javascript')) {
                    responseBody = await response.text();
                    responseType = 'javascript';
                    applySyntaxHighlighting(responseBodyElem, 'javascript', responseBody);
                } else {
                    responseBody = await response.text();
                    // Try to detect if it's JSON
                    try {
                        JSON.parse(responseBody);
                        responseType = 'json';
                        applySyntaxHighlighting(responseBodyElem, 'json', formatJSON(responseBody));
                    } catch (e) {
                        // Not JSON, use plaintext
                        responseType = 'plaintext';
                        applySyntaxHighlighting(responseBodyElem, 'plaintext', responseBody);
                    }
                }
            } catch (error) {
                responseBody = 'Error parsing response body: ' + error.message;
                responseType = 'error';
                responseBodyElem.textContent = responseBody;
            }
        }
        
        // Add request to history
        addToHistory({
            method: method,
            url: url,
            params: params,
            headers: headers,
            auth: {
                type: authType,
                token: authType === 'bearer' ? bearerTokenInput.value.trim() : ''
            },
            body: methodConfig.hasBody ? {
                type: bodyTypeSelect.value,
                rawJson: bodyTypeSelect.value === 'raw' ? jsonBodyTextarea.value.trim() : '',
                formData: bodyTypeSelect.value.includes('form') ? getKeyValuePairs(bodyFormContainer) : {}
            } : { type: 'none' },
            response: {
                status: response.status,
                time: responseTime,
                headers: responseHeaders,
                body: responseBody,
                type: responseType
            }
        })
        
    } catch (error) {
        console.error('Request error:', error);
        statusCodeElem.textContent = 'Error';
        statusCodeElem.classList.add('error');
        responseBodyElem.textContent = error.message;
        responseHeadersElem.textContent = '';
        
        // Add failed request to history as well
        addToHistory({
            method: requestMethodSelect.value,
            url: urlInput.value.trim(),
            params: getKeyValuePairs(paramsContainer),
            headers: getKeyValuePairs(headersContainer),
            auth: {
                type: authTypeSelect.value,
                token: authTypeSelect.value === 'bearer' ? bearerTokenInput.value.trim() : ''
            },
            body: HTTP_METHODS[requestMethodSelect.value]?.hasBody ? {
                type: bodyTypeSelect.value,
                rawJson: bodyTypeSelect.value === 'raw' ? jsonBodyTextarea.value.trim() : '',
                formData: bodyTypeSelect.value.includes('form') ? getKeyValuePairs(bodyFormContainer) : {}
            } : { type: 'none' },
            response: null
        });
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
    
    // Initialize history sidebar
    initializeHistorySidebarState();
    renderHistory();
    
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

// Request History Logic
const MAX_HISTORY_ITEMS = 50; // Keep only the last 50 requests
let requestHistory = JSON.parse(localStorage.getItem('postboyRequestHistory')) || [];

// Initialize history sidebar state (collapsed by default)
function initializeHistorySidebarState() {
    historySidebar.classList.add('collapsed');
    mainContainer.classList.remove('with-history-sidebar');
}

// Toggle history sidebar
headerHistorySidebarBtn.addEventListener('click', () => {
    historySidebar.classList.toggle('collapsed');
    mainContainer.classList.toggle('with-history-sidebar');
});

// Format timestamp for display
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Less than 1 minute
    if (diff < 60000) {
        return 'Just now';
    }
    
    // Less than 1 hour
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}m ago`;
    }
    
    // Less than 24 hours
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}h ago`;
    }
    
    // Less than 7 days
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days}d ago`;
    }
    
    // Show date
    return date.toLocaleDateString();
}

// Add request to history
function addToHistory(requestData) {
    // Create history item
    const historyItem = {
        id: Date.now() + Math.random(), // Unique ID
        method: requestData.method,
        url: requestData.url,
        params: requestData.params,
        headers: requestData.headers,
        auth: requestData.auth,
        body: requestData.body,
        response: requestData.response,
        timestamp: Date.now()
    };
    
    // Add to beginning of array
    requestHistory.unshift(historyItem);
    
    // Keep only the last MAX_HISTORY_ITEMS
    if (requestHistory.length > MAX_HISTORY_ITEMS) {
        requestHistory = requestHistory.slice(0, MAX_HISTORY_ITEMS);
    }
    
    // Save to localStorage
    localStorage.setItem('postboyRequestHistory', JSON.stringify(requestHistory));
    
    // Update the UI
    renderHistory();
}

// Load a history item
function loadHistoryItem(historyItem) {
    // Set method
    requestMethodSelect.value = historyItem.method;
    requestMethodSelect.dispatchEvent(new Event('change'));
    
    // Set URL
    urlInput.value = historyItem.url;
    
    // Set params
    clearContainer(paramsContainer);
    if (Object.keys(historyItem.params || {}).length > 0) {
        for (const [key, value] of Object.entries(historyItem.params)) {
            const pairDiv = addKeyValuePair(paramsContainer);
            pairDiv.querySelector('.key-input').value = key;
            pairDiv.querySelector('.value-input').value = value;
        }
    } else {
        addKeyValuePair(paramsContainer);
    }
    
    // Set headers
    clearContainer(headersContainer);
    if (Object.keys(historyItem.headers || {}).length > 0) {
        for (const [key, value] of Object.entries(historyItem.headers)) {
            const pairDiv = addKeyValuePair(headersContainer);
            pairDiv.querySelector('.key-input').value = key;
            pairDiv.querySelector('.value-input').value = value;
        }
    } else {
        addKeyValuePair(headersContainer);
    }
    
    // Set auth
    if (historyItem.auth) {
        authTypeSelect.value = historyItem.auth.type || 'none';
        authTypeSelect.dispatchEvent(new Event('change'));
        
        if (historyItem.auth.type === 'bearer') {
            bearerTokenInput.value = historyItem.auth.token || '';
        }
    }
    
    // Set body
    if (historyItem.body) {
        bodyTypeSelect.value = historyItem.body.type || 'none';
        bodyTypeSelect.dispatchEvent(new Event('change'));
        
        if (historyItem.body.type === 'raw') {
            jsonBodyTextarea.value = historyItem.body.rawJson || '';
        } else if (historyItem.body.type.includes('form')) {
            clearContainer(bodyFormContainer);
            if (Object.keys(historyItem.body.formData || {}).length > 0) {
                for (const [key, value] of Object.entries(historyItem.body.formData)) {
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
    if (historyItem.response) {
        // Set status code
        statusCodeElem.textContent = historyItem.response.status;
        statusCodeElem.className = '';
        if (historyItem.response.status >= 200 && historyItem.response.status < 400) {
            statusCodeElem.classList.add('success');
        } else {
            statusCodeElem.classList.add('error');
        }
        
        // Set response time
        responseTimeElem.textContent = `${historyItem.response.time} ms`;
        
        // Set response headers
        applySyntaxHighlighting(responseHeadersElem, 'http', historyItem.response.headers);
        
        // Set response body based on type
        if (historyItem.response.type === 'json') {
            applySyntaxHighlighting(responseBodyElem, 'json', formatJSON(historyItem.response.body));
        } else {
            applySyntaxHighlighting(responseBodyElem, historyItem.response.type, historyItem.response.body);
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

// Delete a history item
function deleteHistoryItem(itemId) {
    requestHistory = requestHistory.filter(item => item.id !== itemId);
    localStorage.setItem('postboyRequestHistory', JSON.stringify(requestHistory));
    renderHistory();
}

// Clear all history
function clearAllHistory() {
    if (confirm('Are you sure you want to clear all request history?')) {
        requestHistory = [];
        localStorage.setItem('postboyRequestHistory', JSON.stringify(requestHistory));
        renderHistory();
    }
}

// Render history items
function renderHistory() {
    historyList.innerHTML = '';
    
    if (requestHistory.length === 0) {
        noHistoryMsg.style.display = 'block';
        return;
    }
    
    noHistoryMsg.style.display = 'none';
    
    requestHistory.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        
        // Create header with method
        const itemHeader = document.createElement('div');
        itemHeader.className = 'history-item-header';
        
        const methodSpan = document.createElement('span');
        methodSpan.className = `history-method ${item.method.toLowerCase()}`;
        methodSpan.textContent = item.method;
        
        itemHeader.appendChild(methodSpan);
        
        // URL display
        const urlDiv = document.createElement('div');
        urlDiv.className = 'history-url';
        urlDiv.textContent = item.url;
        urlDiv.title = item.url;
        
        // Meta information (timestamp and status)
        const metaDiv = document.createElement('div');
        metaDiv.className = 'history-meta';
        
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'history-timestamp';
        timestampDiv.innerHTML = `<i class="fas fa-clock"></i> ${formatTimestamp(item.timestamp)}`;
        
        const statusSpan = document.createElement('span');
        statusSpan.className = 'history-status';
        
        if (item.response && item.response.status) {
            statusSpan.textContent = item.response.status;
            if (item.response.status >= 200 && item.response.status < 400) {
                statusSpan.classList.add('success');
            } else {
                statusSpan.classList.add('error');
            }
        } else {
            statusSpan.textContent = 'N/A';
        }
        
        metaDiv.appendChild(timestampDiv);
        metaDiv.appendChild(statusSpan);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'history-delete-btn';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.title = 'Delete from history';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHistoryItem(item.id);
        });
        
        // Add all elements to list item
        listItem.appendChild(itemHeader);
        listItem.appendChild(urlDiv);
        listItem.appendChild(metaDiv);
        listItem.appendChild(deleteBtn);
        
        // Load history item when clicked
        listItem.addEventListener('click', () => {
            loadHistoryItem(item);
        });
        
        historyList.appendChild(listItem);
    });
}

// Clear history button event listener
clearHistoryBtn.addEventListener('click', clearAllHistory);

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
    
    // Sort by most recently saved/used
    const sortedEndpoints = [...savedEndpoints].sort((a, b) => b.timestamp - a.timestamp);
    
    sortedEndpoints.forEach((endpoint, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'saved-endpoint-item';
        
        // Create header with method and name
        const itemHeader = document.createElement('div');
        itemHeader.className = 'saved-endpoint-item-header';
        
        const methodSpan = document.createElement('span');
        methodSpan.className = `saved-endpoint-method ${endpoint.method.toLowerCase()}`;
        methodSpan.textContent = endpoint.method;
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'saved-endpoint-name';
        nameDiv.textContent = endpoint.name || endpoint.url;
        nameDiv.title = endpoint.name || endpoint.url; // Add tooltip for long names
        
        itemHeader.appendChild(methodSpan);
        itemHeader.appendChild(nameDiv);
        
        // URL display - truncate if too long
        const urlSpan = document.createElement('span');
        urlSpan.className = 'saved-endpoint-url';
        
        // Truncate URL if it's too long for display
        let displayUrl = endpoint.url;
        if (displayUrl.length > 40) {
            // Keep the protocol and domain, then truncate the path
            const urlParts = displayUrl.split('//');
            if (urlParts.length > 1) {
                const domainPath = urlParts[1].split('/');
                if (domainPath.length > 1) {
                    // Keep domain and beginning of path
                    displayUrl = urlParts[0] + '//' + domainPath[0] + '/...';
                }
            } else {
                displayUrl = displayUrl.substring(0, 37) + '...';
            }
        }
        
        urlSpan.textContent = displayUrl;
        urlSpan.title = endpoint.url; // Show full URL on hover
        
        // Response status badge if available
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
        
        // Action buttons
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
        
        // Add all elements to card
        listItem.appendChild(itemHeader);
        listItem.appendChild(urlSpan);
        listItem.appendChild(actionsDiv);
        
        // Load endpoint when clicked
        listItem.addEventListener('click', () => {
            loadEndpoint(endpoint);
            // Update the timestamp when used
            endpoint.timestamp = Date.now();
            localStorage.setItem('postboySavedEndpoints', JSON.stringify(savedEndpoints));
        });
        
        savedEndpointsList.appendChild(listItem);
    });
}

// Save Endpoint Button Click Handler
saveEndpointBtn.addEventListener('click', saveEndpoint);

// Header Saved Endpoints Button
headerSavedSidebarBtn.addEventListener('click', () => {
    savedEndpointsSidebar.classList.toggle('collapsed');
    mainContainer.classList.toggle('with-saved-sidebar');
});

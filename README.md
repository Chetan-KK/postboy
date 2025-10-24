# Postman Clone

A lightweight browser-based Postman clone with dark mode and support for making HTTP requests.

Live demo: https://DIVYA-PAWAR-03.github.io/postboy/

## Features

- **Modern Dark/Light Mode UI**: Toggle between dark and light themes with a single click.
- **HTTP Request Methods**: Support for GET and POST requests.
 - **HTTP Request Methods**: Support for GET, POST and additional methods (PUT, PATCH, DELETE, HEAD).
- **Request Customization**:
  - Query Parameters
  - Headers
  - Body Support (Form Data, URL-encoded, Raw JSON)
- **Response Display**:
  - Status Code
  - Response Headers
  - Formatted Response Body
  - Response Time
- **Syntax Highlighting**:
  - JSON formatting and syntax highlighting for request bodies
  - Automatic detection and highlighting for JSON, HTML, CSS, JavaScript, and XML responses
  - Color themes that match the UI dark/light mode
- **User Experience**:
  - Loading indicator during API requests
  - Auto-disable of UI elements while requests are processing
  - Responsive design for various screen sizes
 - **History & Collections**:
   - Saved request history (URL, method, headers, body) persisted in localStorage
   - Ability to load a previous request from the history panel
   - Collections/folders support when saving endpoints to organize requests
 - **Authentication**:
   - Bearer Token and Basic Auth support in the Auth tab
 - **Error Handling**:
   - Friendly messages for network failures and invalid JSON request bodies
   - Clearer response display when content-types are unsupported or when network errors happen

## How to Use

1. **Select Request Method**: Choose GET or POST from the dropdown.
2. **Enter URL**: Input the API endpoint URL.
3. **Configure Request**:
   - Add query parameters (automatically appended to the URL for GET requests)
   - Add headers as needed
   - For POST requests, select body type and add data
4. **Send Request**: Click the Send button to execute the request.
5. **View Response**: See the response status, headers, and body in the response section with syntax highlighting.

## JSON Editing

- JSON in the request body is automatically formatted and highlighted
- Invalid JSON will be preserved as-is until it becomes valid
- Formatting occurs dynamically as you type and when you click away from the editor

## Request Processing

When a request is sent:
- A loading overlay with spinner appears to indicate that the request is being processed
- All interactive UI elements are temporarily disabled to prevent multiple concurrent requests
- Once the response is received or an error occurs, the UI is automatically re-enabled

## CORS Warning

Browser security policies may prevent cross-origin requests to APIs that don't support CORS. For testing such APIs, consider:

- Using a CORS proxy
- Testing in a development environment with CORS disabled
- Using a browser extension that bypasses CORS for testing purposes

## Technical Details

This is a pure frontend implementation built with:
- HTML5
- CSS3 (with CSS variables for theming)
- Vanilla JavaScript (ES6+)
- Fetch API for making HTTP requests
- Highlight.js for syntax highlighting

No additional libraries or frameworks are required.

## Running the Project

Simply open the `index.html` file in a web browser to start using the application. You can also host the files on any static web server. 
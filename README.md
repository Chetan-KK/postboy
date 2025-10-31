# Postman Clone

A lightweight browser-based Postman clone with dark mode and support for making HTTP requests.

## 🚀 Live Demo
Check out the live version of the project here:  
👉 [Postboy Live](https://chetan-kk.github.io/postboy/index.html)

## Features

- **Modern Dark/Light Mode UI**: Toggle between dark and light themes with a single click.
- **HTTP Request Methods**: Support for GET, POST, PUT, DELETE, and HEAD requests.
- **Request Customization**:
  - Query Parameters
  - Headers
  - Body Support (Form Data, URL-encoded, Raw JSON)
  - Bearer Token Authentication
- **Response Display**:
  - Status Code
  - Response Headers
  - Formatted Response Body
  - Response Time
- **Syntax Highlighting**:
  - JSON formatting and syntax highlighting for request bodies
  - Automatic detection and highlighting for JSON, HTML, CSS, JavaScript, and XML responses
  - Color themes that match the UI dark/light mode
- **Request History** (NEW!):
  - Automatically saves all requests (up to 50 most recent)
  - View request history with timestamps and status codes
  - Quickly replay previous requests
  - Delete individual history items or clear all history
  - Persistent storage using localStorage
- **Saved Endpoints**:
  - Save frequently used endpoints with custom names
  - Reload saved endpoints with all configurations
  - Manage saved endpoints collection
- **User Experience**:
  - Loading indicator during API requests
  - Auto-disable of UI elements while requests are processing
  - Responsive design for various screen sizes
  - Mobile-friendly interface

## How to Use

1. **Select Request Method**: Choose from GET, POST, PUT, DELETE, or HEAD from the dropdown.
2. **Enter URL**: Input the API endpoint URL.
3. **Configure Request**:
   - Add query parameters (automatically appended to the URL)
   - Add headers as needed
   - Configure authentication (Bearer Token)
   - For POST/PUT requests, select body type and add data
4. **Send Request**: Click the Send button to execute the request.
5. **View Response**: See the response status, headers, and body in the response section with syntax highlighting.
6. **Access History**: Click the History button to view your recent requests and quickly replay them.
7. **Save Endpoints**: Click the bookmark icon to save endpoints for later use.

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

# USF SmartStudy Spaces

![Project Logo](frontend/web_app/assets/logo.png)

A smart campus solution for real-time study space management at University of South Florida.

## Features
- 🏫 Real-time space availability tracking
- 📅 Calendar integration for smart scheduling
- 📱 Cross-platform access (web + mobile)
- 📊 Analytics dashboard for administrators

## Quick Start
1. **Prerequisites:**
   - Node.js v16+
   - Azure Functions Core Tools
   - Azure account (for deployment)

2. **Installation:**
   ```bash
   # Backend
   cd backend/azure_functions
   npm install

   # Web Frontend
   cd ../../frontend/web_app
   npm install

   # Mobile App
   cd ../mobile_app
   npm install
   ```

3. **Running Locally:**
   ```bash
   # Start backend services
   cd backend/azure_functions
   func start

   # Start web app
   cd ../../frontend/web_app
   npm start

   # Start mobile app (iOS)
   cd ../mobile_app
   npx react-native run-ios
   ```

## Development security checks

`python frontend/web_app/server.py` serves only the web-app directory on
`127.0.0.1:8000`, independently of the launch directory. Hidden files, server
source, paths resolving outside that directory and directory listings are denied.
This is a local preview, not a production server.

Run the focused checks without downloading dependencies:

```bash
python -m unittest discover -s tests/frontend_tests -p 'test_dev_server_security.py'
node --test tests/backend_tests/occupancy_security.test.cjs
```

The occupancy tests exercise handler behavior through a local registration stub.
They do not validate Azure deployment. The existing prototype mixes a v3 Functions
dependency/binding layout with a v4 registration API, references an absent compiled
entry point, and lacks the frontend build manifest. Those application setup gaps
remain unresolved; do not treat these focused tests as a deployable application.
The handler retains function-key authorization and returns a generic error without
reflecting internal exception details.

## Project Structure

```
USF_SmartStudy_Spaces/
├── docs/            # Project documentation
├── backend/         # Azure Functions and APIs
├── frontend/        # Web and mobile applications
└── tests/           # Unit and integration tests
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Project Team: smartstudy@usf.edu

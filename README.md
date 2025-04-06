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
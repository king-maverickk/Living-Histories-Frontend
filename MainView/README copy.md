# MainView React Application

A modern, modular React application built with Create React App and Tailwind CSS, featuring location-based event discovery and audio guide functionality.

## 🚀 Project Overview

This application provides users with an interactive map-based experience for discovering historical events and locations. Users can explore their surroundings, select events of interest, and listen to AI-generated audio guides about historical significance.

### Key Features

- **Interactive Map Integration**: Google Maps integration for location discovery
- **Event Selection**: Browse and select historical events by location
- **Audio Guide Generation**: AI-powered audio content for selected events
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modular Architecture**: Clean, maintainable component structure

## 📋 Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Development Guidelines](#development-guidelines)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 🛠 Installation

### Prerequisites

- Node.js (version 14.0 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MainView
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   REACT_APP_PLACES_ENDPOINT=your_places_api_endpoint
   REACT_APP_GET_EVENTS_ENDPOINT=your_events_api_endpoint
   REACT_APP_AUDIO_GEN_ENDPOINT=your_audio_generation_endpoint
   BASE_PATH=your_base_path
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 🏗 Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (LoadingIndicator, ErrorMessage)
│   ├── ChooseEvent/    # Event selection component
│   ├── ChooseEventPanel/ # Event selection panel
│   ├── EventItem/      # Individual event display
│   ├── GenerateButton/ # Audio generation trigger
│   ├── InformationCard/ # Audio playback card
│   ├── LocationBar/    # Location display component
│   ├── MainView/       # Main application view
│   ├── MapErrorDisplay/ # Map error handling
│   └── SwipeableCardContainer/ # Horizontal scrolling cards
├── hooks/              # Custom React hooks
│   ├── useLocation.js  # Location state management
│   ├── usePlaces.js    # Places data fetching
│   ├── useEvents.js    # Events data management
│   └── useAudioCards.js # Audio generation functionality
├── utils/              # Helper functions and utilities
│   ├── eventUtils.js   # Event data processing
│   ├── apiUtils.js     # API operation helpers
│   └── helpers.js      # General utility functions
├── context/            # React Context providers
│   ├── AppContext.js   # Global app state
│   ├── LocationContext.js # Location state
│   ├── EventsContext.js # Events state
│   └── AudioContext.js # Audio state
└── types/              # TypeScript interfaces/types (future use)
```

### Component Hierarchy

```
App (AppProvider)
└── MainView
    ├── GoogleMap
    ├── LocationBar
    ├── GenerateButton
    ├── ChooseEventPanel
    │   └── EventItem (multiple)
    └── SwipeableCardContainer
        └── InformationCard (multiple)
```

### State Management

The application uses React Context for state management, organized into specialized contexts:

- **AppContext**: Global application state (UI state, modals)
- **LocationContext**: User location and geographic data
- **EventsContext**: Historical events and related data
- **AudioContext**: Audio generation and playback state

### Custom Hooks

- **useLocation**: Manages user location detection and area resolution
- **usePlaces**: Handles places data fetching and caching
- **useEvents**: Manages events data retrieval and processing
- **useAudioCards**: Controls audio generation and card management

## 📖 Development Guidelines

### Code Style

- Use **functional components** with hooks
- Follow **JSDoc** commenting standards for all functions and components
- Implement **PropTypes** for type checking
- Use **Tailwind CSS** for styling
- Follow **conventional commit** message format

### Component Guidelines

1. **Single Responsibility**: Each component should have one clear purpose
2. **Reusability**: Design components to be reusable across the application
3. **Props Interface**: Clearly define and document all props
4. **Error Handling**: Implement proper error boundaries and fallbacks

### Naming Conventions

- **Components**: PascalCase (e.g., `LocationBar`, `EventItem`)
- **Hooks**: camelCase with "use" prefix (e.g., `useLocation`, `useEvents`)
- **Utilities**: camelCase (e.g., `parseEventString`, `getCategoryImage`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `CATEGORY_IMAGES`)

### Git Workflow

Use conventional commit messages:
- `feat:` New features
- `refactor:` Code restructuring
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Formatting changes
- `test:` Test updates

Example:
```bash
git commit -m "feat(components): Add LocationBar component for address display"
```



## 🔌 API Integration

### Endpoints Configuration

The application integrates with three main API endpoints:

#### Places API
- **Endpoint**: `REACT_APP_PLACES_ENDPOINT`
- **Purpose**: Retrieve location-based places data
- **Caching**: Implements localStorage caching by location
- **Format**: Expects JSON response with `Content` array

#### Events API
- **Endpoint**: `REACT_APP_GET_EVENTS_ENDPOINT`
- **Purpose**: Fetch historical events for a given location
- **Parameters**: `location` (town), `country`
- **Format**: Supports both string arrays and structured objects

#### Audio Generation API
- **Endpoint**: `REACT_APP_AUDIO_GEN_ENDPOINT`
- **Purpose**: Generate audio content for selected events
- **Method**: POST
- **Payload**: 
  ```json
  {
    "eventName": "string",
    "eventYears": "string", 
    "eventCategory": "string",
    "town": "string",
    "country": "string"
  }
  ```

### Error Handling

- **Network Errors**: Graceful fallback with user-friendly messages
- **API Timeouts**: Automatic retry mechanisms where appropriate
- **Data Validation**: Input sanitization and response validation
- **Offline Support**: Cached data utilization when APIs are unavailable

## 🧪 Testing

### Testing Strategy

The application includes comprehensive testing coverage:

#### Unit Testing
- Component rendering tests
- Hook functionality tests
- Utility function tests
- Context provider tests

#### Integration Testing
- API integration tests
- Component interaction tests
- State management flow tests

#### End-to-End Testing
- User workflow tests
- Cross-browser compatibility
- Mobile responsiveness tests

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- LocationBar.test.js
```

### Testing Guidelines

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how
2. **Mock External Dependencies**: Use mocks for API calls and external services
3. **Test Edge Cases**: Include error states, empty data, and boundary conditions
4. **Maintain Test Coverage**: Aim for >80% code coverage

## 🚀 Deployment

### Build Process

```bash
# Create production build
npm run build

# Serve build locally for testing
npx serve -s build
```

### Environment Variables

Ensure all required environment variables are configured for production:

```env
REACT_APP_PLACES_ENDPOINT=https://api.example.com/places
REACT_APP_GET_EVENTS_ENDPOINT=https://api.example.com/events
REACT_APP_AUDIO_GEN_ENDPOINT=https://api.example.com/audio
BASE_PATH=/your-app-path
```

### Performance Optimization

- **Code Splitting**: Implemented at route level
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed assets and WebP format
- **Caching Strategy**: Aggressive caching for static assets
- **Bundle Analysis**: Regular bundle size monitoring

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the development guidelines
4. Add tests for new functionality
5. Commit using conventional commit format
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Pull Request Guidelines

- **Clear Description**: Explain what changes were made and why
- **Test Coverage**: Include tests for new features
- **Documentation**: Update README and JSDoc comments as needed
- **Code Review**: Address all review comments before merging

### Code Review Checklist

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Performance impact considered
- [ ] Accessibility standards met

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the excellent Create React App framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Google Maps**: For the mapping and location services
- **AOS Library**: For smooth scroll animations
- **Community Contributors**: For ongoing improvements and feedback

## 📞 Support

For support and questions:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation**: [Project Wiki](https://github.com/your-repo/wiki)

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies.**


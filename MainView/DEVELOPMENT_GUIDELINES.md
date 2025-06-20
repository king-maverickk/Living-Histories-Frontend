# Development Guidelines

## 📋 Overview

This document provides comprehensive guidelines for developing and maintaining the MainView React application. Following these guidelines ensures code consistency, maintainability, and team collaboration efficiency.

## 🏗 Architecture Principles

### Component Design
- **Single Responsibility**: Each component should have one clear, well-defined purpose
- **Composition over Inheritance**: Favor component composition and hooks over class inheritance
- **Reusability**: Design components to be reusable across different parts of the application
- **Testability**: Structure components to be easily testable in isolation

### State Management
- **Context for Global State**: Use React Context for state that needs to be shared across multiple components
- **Local State for Component-Specific Data**: Keep component-specific state local using useState
- **Custom Hooks for Logic**: Extract complex state logic into custom hooks for reusability
- **Immutable Updates**: Always update state immutably to prevent unexpected side effects

## 📝 Code Style Guidelines

### JavaScript/React Standards

#### Component Structure
```javascript
/**
 * Component description
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 * @returns {JSX.Element} Component JSX
 */
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ title, children }) => {
  // Hooks at the top
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-wrapper">
      <h1>{title}</h1>
      {children}
    </div>
  );
};

ComponentName.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default ComponentName;
```

#### Custom Hooks Structure
```javascript
/**
 * Custom hook description
 * @param {string} dependency - Hook dependency
 * @returns {Object} Hook return value
 */
export const useCustomHook = (dependency) => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Effect logic
  }, [dependency]);
  
  return {
    state,
    setState
  };
};
```

### Naming Conventions

#### Files and Directories
- **Components**: PascalCase (e.g., `LocationBar/index.js`)
- **Hooks**: camelCase with "use" prefix (e.g., `useLocation.js`)
- **Utilities**: camelCase (e.g., `eventUtils.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)

#### Variables and Functions
- **Variables**: camelCase (e.g., `userLocation`, `eventData`)
- **Functions**: camelCase with descriptive verbs (e.g., `handleClick`, `fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_ATTEMPTS`)
- **Boolean variables**: Use "is", "has", "can" prefixes (e.g., `isLoading`, `hasError`)

### CSS and Styling

#### Tailwind CSS Guidelines
- **Utility-First**: Use Tailwind utility classes for styling
- **Responsive Design**: Use responsive prefixes (sm:, md:, lg:, xl:)
- **Custom Classes**: Create custom CSS classes only when necessary
- **Consistent Spacing**: Use Tailwind's spacing scale consistently

```javascript
// Good: Utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// Avoid: Inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

## 🧪 Testing Guidelines

### Testing Strategy
- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test component interactions and data flow
- **End-to-End Tests**: Test complete user workflows

### Testing Best Practices
```javascript
// Component testing example
import { render, screen, fireEvent } from '@testing-library/react';
import LocationBar from './LocationBar';

describe('LocationBar', () => {
  it('displays user address when provided', () => {
    const address = '123 Main St, City, Country';
    render(<LocationBar userAddress={address} />);
    
    expect(screen.getByText(address)).toBeInTheDocument();
  });
  
  it('shows loading text when address is not available', () => {
    render(<LocationBar userAddress={null} />);
    
    expect(screen.getByText('Finding your location...')).toBeInTheDocument();
  });
});
```

## 📚 Documentation Standards

### JSDoc Comments
All functions, components, and hooks must include JSDoc comments:

```javascript
/**
 * Parse event string into structured object
 * @param {string} eventString - Raw event string to parse
 * @returns {Object|null} Parsed event object or null if invalid
 * @example
 * const event = parseEventString("Battle of Hastings - 1066 - Military");
 * // Returns: { eventName: "Battle of Hastings", eventYears: "1066", eventCategory: "Military" }
 */
export const parseEventString = (eventString) => {
  // Implementation
};
```

### README Updates
- Update README.md when adding new features or changing architecture
- Include setup instructions for new dependencies
- Document environment variables and configuration options

## 🔄 Git Workflow

### Commit Message Format
Follow the Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **refactor**: Code refactoring
- **docs**: Documentation changes
- **style**: Code formatting changes
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

#### Examples
```bash
feat(components): add LocationBar component for address display

refactor(hooks): extract location logic into useLocation hook

fix(api): handle network errors in event fetching

docs(readme): update installation instructions
```

### Branch Naming
- **Feature branches**: `feature/component-name` or `feature/feature-description`
- **Bug fixes**: `fix/bug-description`
- **Refactoring**: `refactor/area-being-refactored`

### Pull Request Guidelines
1. **Clear Title**: Use descriptive titles following commit message format
2. **Description**: Explain what changes were made and why
3. **Testing**: Include information about testing performed
4. **Screenshots**: Add screenshots for UI changes
5. **Breaking Changes**: Clearly document any breaking changes

## 🚀 Performance Guidelines

### Component Optimization
- **React.memo**: Use for components that receive the same props frequently
- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize event handlers passed to child components
- **Lazy Loading**: Use React.lazy for code splitting

### Bundle Optimization
- **Tree Shaking**: Import only what you need from libraries
- **Dynamic Imports**: Use dynamic imports for large dependencies
- **Image Optimization**: Optimize images and use appropriate formats

## 🔒 Security Guidelines

### Data Handling
- **Input Validation**: Validate all user inputs
- **XSS Prevention**: Sanitize data before rendering
- **API Security**: Use HTTPS for all API communications
- **Environment Variables**: Never commit sensitive data to version control

### Dependencies
- **Regular Updates**: Keep dependencies updated
- **Security Audits**: Run `npm audit` regularly
- **Minimal Dependencies**: Only add dependencies when necessary

## 📱 Accessibility Guidelines

### WCAG Compliance
- **Semantic HTML**: Use appropriate HTML elements
- **Alt Text**: Provide descriptive alt text for images
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Color Contrast**: Maintain sufficient color contrast ratios

### Testing
- **Screen Readers**: Test with screen reader software
- **Keyboard Only**: Test navigation using only keyboard
- **Automated Testing**: Use accessibility testing tools

## 🔧 Development Tools

### Recommended Extensions (VS Code)
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**

### Configuration Files
Ensure these configuration files are properly set up:
- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `jsconfig.json` - JavaScript project configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 📞 Getting Help

### Resources
- **React Documentation**: https://reactjs.org/docs
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Testing Library Documentation**: https://testing-library.com/docs
- **Project Wiki**: Internal project documentation

### Team Communication
- **Code Reviews**: Request reviews for all changes
- **Architecture Discussions**: Discuss major architectural changes with the team
- **Knowledge Sharing**: Share learnings and best practices

---

Following these guidelines ensures consistent, maintainable, and high-quality code across the entire project. Regular reviews and updates of these guidelines help the team stay aligned with best practices and evolving standards.


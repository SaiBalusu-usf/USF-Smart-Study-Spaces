import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapComponent from '../../../frontend/web_app/components/MapComponent';

describe('MapComponent', () => {
  test('renders map container and controls', () => {
    render(<MapComponent />);
    
    // Verify main elements are rendered
    expect(screen.getByText('Campus Map')).toBeInTheDocument();
    expect(screen.getByText('Layers')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Legend')).toBeInTheDocument();
    expect(screen.getByText('My Location')).toBeInTheDocument();
    
    // Verify placeholder content
    expect(screen.getByText('Interactive map coming soon')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<MapComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
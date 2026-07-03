import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import POIMarker from './POIMarker';
import type { POI } from '../data/pois';

const mockPoi: POI = {
  id: 'poi-test',
  mapId: 'mapa-principal',
  x: 500,
  y: 300,
  nome: 'Local Teste',
  descricao: 'Descrição do local teste',
  imagens: ['/locations/test.jpg'],
};

describe('POIMarker', () => {
  it('renders with correct position', () => {
    render(<POIMarker poi={mockPoi} onSelect={vi.fn()} isActive={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ left: '500px', top: '300px' });
  });

  it('displays poi name as aria-label and title', () => {
    render(<POIMarker poi={mockPoi} onSelect={vi.fn()} isActive={false} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Ver detalhes: Local Teste');
    expect(button).toHaveAttribute('title', 'Local Teste');
  });

  it('calls onSelect with poi when clicked', () => {
    const onSelect = vi.fn();
    render(<POIMarker poi={mockPoi} onSelect={onSelect} isActive={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(mockPoi);
  });

  it('applies active class when isActive is true', () => {
    render(<POIMarker poi={mockPoi} onSelect={vi.fn()} isActive={true} />);
    expect(screen.getByRole('button')).toHaveClass('poi-marker--active');
  });

  it('does not apply active class when isActive is false', () => {
    render(<POIMarker poi={mockPoi} onSelect={vi.fn()} isActive={false} />);
    expect(screen.getByRole('button')).not.toHaveClass('poi-marker--active');
  });
});

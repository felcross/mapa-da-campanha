import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import POICard from './POICard';
import type { POI } from '../data/pois';

const mockPoi: POI = {
  id: 'poi-test',
  x: 500,
  y: 300,
  nome: 'Local Teste',
  descricao: 'Descrição do local teste',
  imagem: '/locations/test.jpg',
};

describe('POICard', () => {
  it('renders nothing when poi is null', () => {
    const { container } = render(<POICard poi={null} onClose={vi.fn()} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders dialog with poi details', () => {
    render(<POICard poi={mockPoi} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Local Teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição do local teste')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<POICard poi={mockPoi} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Fechar'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(<POICard poi={mockPoi} onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when card body is clicked', () => {
    const onClose = vi.fn();
    render(<POICard poi={mockPoi} onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn();
    render(<POICard poi={mockPoi} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has accessible dialog attributes', () => {
    render(<POICard poi={mockPoi} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'poi-card-title');
  });

  it('uses fallback image on error', () => {
    render(<POICard poi={mockPoi} onClose={vi.fn()} />);
    const img = screen.getByRole('img', { name: 'Local Teste' });
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/locations/sem-imagem.svg');
  });
});

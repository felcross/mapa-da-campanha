import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import POICard from './POICard';
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

const mockPoiMultipleImages: POI = {
  ...mockPoi,
  id: 'poi-multi',
  imagens: ['/locations/img1.jpg', '/locations/img2.jpg', '/locations/img3.jpg'],
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
    const img = screen.getByRole('img', { name: 'Local Teste - imagem 1' });
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/locations/sem-imagem.svg');
  });

  it('does not show carousel nav for single image', () => {
    render(<POICard poi={mockPoi} onClose={vi.fn()} />);
    expect(screen.queryByLabelText('Imagem anterior')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Próxima imagem')).not.toBeInTheDocument();
  });

  it('shows carousel nav for multiple images', () => {
    render(<POICard poi={mockPoiMultipleImages} onClose={vi.fn()} />);
    expect(screen.getByLabelText('Imagem anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Próxima imagem')).toBeInTheDocument();
    expect(screen.getByLabelText('Imagem 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Imagem 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Imagem 3')).toBeInTheDocument();
  });

  it('navigates carousel with next/prev buttons', () => {
    render(<POICard poi={mockPoiMultipleImages} onClose={vi.fn()} />);
    const nextBtn = screen.getByLabelText('Próxima imagem');
    const prevBtn = screen.getByLabelText('Imagem anterior');

    // Start at image 1
    expect(screen.getByLabelText('Imagem 1')).toHaveClass('poi-card__dot--active');

    // Go to image 2
    fireEvent.click(nextBtn);
    expect(screen.getByLabelText('Imagem 2')).toHaveClass('poi-card__dot--active');

    // Go to image 3
    fireEvent.click(nextBtn);
    expect(screen.getByLabelText('Imagem 3')).toHaveClass('poi-card__dot--active');

    // Wrap to image 1
    fireEvent.click(nextBtn);
    expect(screen.getByLabelText('Imagem 1')).toHaveClass('poi-card__dot--active');

    // Go back to image 3
    fireEvent.click(prevBtn);
    expect(screen.getByLabelText('Imagem 3')).toHaveClass('poi-card__dot--active');
  });

  it('navigates carousel with dot buttons', () => {
    render(<POICard poi={mockPoiMultipleImages} onClose={vi.fn()} />);

    // Click dot 3
    fireEvent.click(screen.getByLabelText('Imagem 3'));
    expect(screen.getByLabelText('Imagem 3')).toHaveClass('poi-card__dot--active');

    // Click dot 1
    fireEvent.click(screen.getByLabelText('Imagem 1'));
    expect(screen.getByLabelText('Imagem 1')).toHaveClass('poi-card__dot--active');
  });
});

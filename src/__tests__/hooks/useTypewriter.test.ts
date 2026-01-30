/**
 * 🧪 Test Suite: useTypewriter Hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTypewriter } from '../../hooks/useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial empty display text', () => {
    const { result } = renderHook(() => 
      useTypewriter(['Hello', 'World'])
    );

    expect(result.current.displayedText).toBe('');
    expect(result.current.isComplete).toBe(false);
    expect(result.current.isDeleting).toBe(false);
  });

  it('should type out the first word', async () => {
    const { result } = renderHook(() => 
      useTypewriter(['Hi'], { speed: 50, loop: false })
    );

    // Avanza il timer per ogni carattere
    act(() => {
      vi.advanceTimersByTime(50); // 'H'
    });
    expect(result.current.displayedText).toBe('H');

    act(() => {
      vi.advanceTimersByTime(50); // 'i'
    });
    expect(result.current.displayedText).toBe('Hi');
  });

  it('should include cursor in textWithCursor', () => {
    const { result } = renderHook(() => 
      useTypewriter(['Test'], { cursor: true })
    );

    expect(result.current.textWithCursor).toBe('|');
    
    act(() => {
      vi.advanceTimersByTime(100); // First character
    });
    expect(result.current.textWithCursor).toBe('T|');
  });

  it('should start with index 0', () => {
    const { result } = renderHook(() => 
      useTypewriter(['One', 'Two', 'Three'], { speed: 10 })
    );

    expect(result.current.displayedText).toBe('');
  });

  it('should accept custom speed options', () => {
    const { result } = renderHook(() => 
      useTypewriter(['Fast'], { speed: 10, deleteSpeed: 5, delayBetween: 50 })
    );

    expect(result.current.displayedText).toBe('');
    
    act(() => {
      vi.advanceTimersByTime(10);
    });
    
    expect(result.current.displayedText).toBe('F');
  });

  it('should handle empty words array gracefully', () => {
    const { result } = renderHook(() => 
      useTypewriter([])
    );

    expect(result.current.displayedText).toBe('');
  });

  it('should initialize isComplete as false', () => {
    const { result } = renderHook(() => 
      useTypewriter(['Test'], { loop: false })
    );

    // Inizialmente non è completato
    expect(result.current.isComplete).toBe(false);
  });
});

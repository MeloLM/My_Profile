/**
 * 🧪 Test Suite: useWindowSize Hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useWindowSize } from '../../hooks/useWindowSize';

describe('useWindowSize', () => {
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    // Ripristina dimensioni originali
    Object.defineProperty(window, 'innerWidth', { 
      value: originalInnerWidth, 
      writable: true 
    });
    Object.defineProperty(window, 'innerHeight', { 
      value: originalInnerHeight, 
      writable: true 
    });
  });

  const setWindowSize = (width: number, height: number) => {
    Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
    window.dispatchEvent(new Event('resize'));
  };

  it('should return initial window dimensions', () => {
    setWindowSize(1200, 800);
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1200);
    expect(result.current.height).toBe(800);
  });

  it('should identify desktop viewport', () => {
    setWindowSize(1400, 900);
    const { result } = renderHook(() => useWindowSize());
    
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isMobile).toBe(false);
  });

  it('should identify tablet viewport', () => {
    setWindowSize(900, 1024);
    const { result } = renderHook(() => useWindowSize());
    
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.isTablet).toBe(true);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('should identify mobile viewport', () => {
    setWindowSize(375, 667);
    const { result } = renderHook(() => useWindowSize());
    
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('should detect landscape orientation', () => {
    setWindowSize(1200, 600);
    const { result } = renderHook(() => useWindowSize());
    
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.isLandscape).toBe(true);
  });

  it('should detect portrait orientation', () => {
    setWindowSize(600, 1200);
    const { result } = renderHook(() => useWindowSize());
    
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current.isLandscape).toBe(false);
  });

  it('should update on window resize', () => {
    setWindowSize(1200, 800);
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.isDesktop).toBe(true);

    // Ridimensiona a mobile
    act(() => {
      setWindowSize(375, 667);
      vi.advanceTimersByTime(150);
    });

    expect(result.current.width).toBe(375);
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it('should respect custom breakpoints', () => {
    setWindowSize(500, 800);
    
    const { result } = renderHook(() => 
      useWindowSize({ 
        mobileBreakpoint: 400,
        tabletBreakpoint: 800 
      })
    );
    
    act(() => {
      vi.advanceTimersByTime(150);
    });

    // 500px è tra 400 e 800, quindi è tablet
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isMobile).toBe(false);
  });

  it('should throttle resize events', () => {
    setWindowSize(1200, 800);
    const { result } = renderHook(() => useWindowSize({ throttleMs: 100 }));

    // Emetti multiple resize in rapida successione
    act(() => {
      setWindowSize(1000, 700);
      setWindowSize(800, 600);
      setWindowSize(600, 500);
    });

    // Solo dopo il throttle si aggiorna
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.width).toBe(600);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useWindowSize());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });
});

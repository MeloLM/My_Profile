/**
 * 🧪 Test Suite: useKonamiCode Hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useKonamiCode } from '../../hooks/useKonamiCode';

// Sequenza Konami: ↑ ↑ ↓ ↓ ← → ← → B A (usando event.code)
const KONAMI_KEYS = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];

const pressKey = (code: string) => {
  window.dispatchEvent(new KeyboardEvent('keydown', { code }));
};

describe('useKonamiCode', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should return initial values correctly', () => {
    const { result } = renderHook(() => useKonamiCode());

    expect(result.current.isActivated).toBe(false);
    expect(result.current.progress).toBe(0);
    expect(typeof result.current.resetEasterEgg).toBe('function');
  });

  it('should track progress as keys are pressed', () => {
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      pressKey('ArrowUp');
    });
    expect(result.current.progress).toBe(1);

    act(() => {
      pressKey('ArrowUp');
    });
    expect(result.current.progress).toBe(2);
  });

  it('should reset progress on wrong key', () => {
    const { result } = renderHook(() => useKonamiCode());

    // Premi alcuni tasti corretti
    act(() => {
      pressKey('ArrowUp');
      pressKey('ArrowUp');
      pressKey('ArrowDown');
    });
    expect(result.current.progress).toBe(3);

    // Premi tasto sbagliato
    act(() => {
      pressKey('KeyX');
    });
    expect(result.current.progress).toBe(0);
  });

  it('should activate when full sequence is entered', () => {
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      KONAMI_KEYS.forEach(code => pressKey(code));
    });

    expect(result.current.isActivated).toBe(true);
  });

  it('should call callback when activated', () => {
    const callback = vi.fn();
    
    renderHook(() => useKonamiCode(callback));

    act(() => {
      KONAMI_KEYS.forEach(code => pressKey(code));
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should reset via resetEasterEgg function', () => {
    const { result } = renderHook(() => useKonamiCode());

    // Attiva il codice
    act(() => {
      KONAMI_KEYS.forEach(code => pressKey(code));
    });
    expect(result.current.isActivated).toBe(true);

    // Reset
    act(() => {
      result.current.resetEasterEgg();
    });
    expect(result.current.isActivated).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('should reset on timeout when configured', () => {
    const { result } = renderHook(() => 
      useKonamiCode(undefined, { resetDelay: 1000 })
    );

    // Inizia la sequenza
    act(() => {
      pressKey('ArrowUp');
      pressKey('ArrowUp');
    });
    expect(result.current.progress).toBe(2);

    // Aspetta timeout
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Progress dovrebbe essere resettato
    expect(result.current.progress).toBe(0);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useKonamiCode());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });
});

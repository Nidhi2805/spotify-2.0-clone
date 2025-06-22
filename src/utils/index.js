export const formatDuration = (duration) => {
    if (typeof duration === 'number') {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    if (typeof duration === 'string') {
      const [mins, secs] = duration.split(':');
      return `${mins}:${secs.padStart(2, '0')}`;
    }
    
    return '0:00';
  };
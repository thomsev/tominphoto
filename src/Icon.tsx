type IconName = 'diagonal' | 'down' | 'downRight' | 'up' | 'left' | 'right' | 'close' | 'grid' | 'asterisk' | 'check'
const paths: Record<IconName, string> = {
  diagonal: 'M5 19 19 5M5 5h14v14',
  down: 'M12 4v16M5 13l7 7 7-7',
  downRight: 'M5 5l14 14M5 19h14V5',
  up: 'M12 20V4M5 11l7-7 7 7',
  left: 'M20 12H4m7-7-7 7 7 7',
  right: 'M4 12h16m-7-7 7 7-7 7',
  close: 'm6 6 12 12M6 18 18 6',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  asterisk: 'M12 2v20M2 12h20M5 5l14 14M5 19 19 5',
  check: 'm4 12 5 5L20 6',
}
export function Icon({ name = 'diagonal', size = 20 }: { name?: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>
}

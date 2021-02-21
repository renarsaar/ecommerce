// Handle order background color based on order status
export default function useHandleOrderBackground(status) {
  if (status === 'Completed') return 'rgba(61, 184, 30, 0.1)';
  if (status === 'Active') return 'rgba(194, 188, 18, 0.1)';
  if (status === 'Cancelled') return 'rgba(213, 13, 13, 0.1)';
  if (status === 'Seen By Admin') return 'rgba(163, 163, 163, 0.1)';
  if (status === 'Recieved') return 'rgba(163, 163, 163, 0.05)';
}

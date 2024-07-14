import Skeleton from '@mui/joy/Skeleton';

export const LoadingSkeleton = () => {
  return (
    <tr>
      <td>
        <Skeleton variant="rectangular" height={25} width={'100%'} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={25} width={'100%'} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={25} width={'100%'} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={25} width={'100%'} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={25} width={'100%'} />
      </td>
      <td>
        <Skeleton variant="rectangular" height={25} width={'100%'} />
      </td>
    </tr>
  );
};

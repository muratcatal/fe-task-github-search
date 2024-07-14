import { ORDER_TYPES } from '@fetask/fe-task-constants';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button, Link } from '@mui/joy';
import MUITable from '@mui/joy/Table';
import { ReactNode } from 'react';
import { TableFooter } from './styled';

type CurrentSort = { column: string; order: ORDER_TYPES };

type TableProps<T> = {
  HeaderItems:
    | string[]
    | {
        title: string;
        sortable?: boolean;
      }[];
  data: T[];
  pagination: {
    hasNextPage?: boolean;
    currentPage?: number;
    onPageChange?: (page: number) => void;
  };
  children: ({ data }: { data: T[] }) => ReactNode;
  onSort?: (key: string, order: ORDER_TYPES) => void;
  currentSort?: CurrentSort;
  loading?: boolean;
  LoadingSkeleton?: ReactNode;
};

const getSortOrder = (clickedHeader: string, currentSort?: CurrentSort) => {
  if (currentSort?.column === clickedHeader) {
    return currentSort.order === 'asc' ? 'desc' : 'asc';
  }
  return 'asc';
};

export const Table = <T,>({
  HeaderItems,
  data,
  children,
  pagination: { hasNextPage, currentPage = 1, onPageChange },
  onSort,
  currentSort,
  loading,
  LoadingSkeleton,
}: TableProps<T>) => {
  return (
    <>
      <MUITable>
        <thead>
          <tr>
            {HeaderItems.map((Header) => (
              <th>
                {typeof Header === 'string' ? (
                  Header
                ) : (
                  <Link
                    underline="none"
                    color="neutral"
                    textColor={
                      currentSort?.column === Header.title
                        ? 'primary.plainColor'
                        : undefined
                    }
                    component="button"
                    {...(Header.sortable
                      ? {
                          onClick: () => {
                            onSort?.(
                              Header.title,
                              getSortOrder(Header.title, currentSort)
                            );
                          },
                          startDecorator: (
                            <ArrowDownwardIcon
                              sx={{
                                opacity:
                                  currentSort?.column === Header.title ? 1 : 0,
                              }}
                            />
                          ),
                        }
                      : {})}
                    fontWeight="lg"
                    sx={{
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          getSortOrder(Header.title, currentSort) === 'asc'
                            ? 'rotate(0deg)'
                            : 'rotate(180deg)',
                      },
                      '&:hover': { '& svg': { opacity: 1 } },
                    }}
                  >
                    {Header.title}
                  </Link>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody> {loading ? LoadingSkeleton : children({ data })}</tbody>
      </MUITable>
      <TableFooter>
        <Button
          disabled={currentPage === 1 || loading}
          onClick={() => {
            onPageChange?.(currentPage - 1);
          }}
        >
          Prev
        </Button>
        <Button
          disabled={!hasNextPage || loading}
          onClick={() => {
            onPageChange?.(currentPage + 1);
          }}
        >
          Next
        </Button>
      </TableFooter>
    </>
  );
};

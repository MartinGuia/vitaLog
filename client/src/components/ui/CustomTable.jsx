import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from "@heroui/react";

function PaginatedTable({
  columns = [],
  items = [],
  isLoading = false,
  page = 1,
  totalItems = 0,
  rowsPerPage = 8,
  onPageChange = () => {},
}) {
  const pages = Math.ceil(totalItems / rowsPerPage);
  const loadingState = isLoading ? "loading" : "idle";

  // Calcular los items a mostrar en la página actual
  const paginatedItems = items.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getDisplayValue = (item, columnKey) => {
    return getKeyValue(item, columnKey) || "-";
  };

  return (
    <Table
      className="text-xs"
      aria-label="Tabla de datos"
      bottomContent={
        pages > 1 && (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={onPageChange}
            />
          </div>
        )
      }
      
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}>{col.label}</TableColumn>
        ))}
      </TableHeader>

      <TableBody
        items={paginatedItems} // Usamos los items paginados
        loadingState={loadingState}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item._id || item.id || JSON.stringify(item)}>
            {(columnKey) => (
              <TableCell  className={columnKey === "direccion" ? "text-xs" : ""}>{getDisplayValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default PaginatedTable;

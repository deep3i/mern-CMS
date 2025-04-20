import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { staticCustomers } from "../../utils/json";

const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 500));
      return staticCustomers;
    },
  });
};

const CustomerTable = ({ handleOpen }) => {
  const { data, isLoading } = useCustomers();
  const [globalFilter, setGlobalFilter] = useState("");
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogComments = () => {
    if (!showComments) {
      setShowComments(true);
      return;
    }

    const logs = data
      .map((cust) => {
        const comment = comments[cust.id];
        return comment?.trim()
          ? { ...cust, comment: comment.trim() }
          : null;
      })
      .filter(Boolean);

    if (logs.length === 0) {
      alert("No comments to log!");
    } else {
      console.log("Customer Comments Log:", logs);
    }
  };

  const columns = useMemo(() => {
    const base = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "company", header: "Company" },
    ];

    if (showComments) {
      base.push({
        accessorKey: "comment",
        header: "Comment",
        cell: ({ row }) => (
          <input
            type="text"
            className="border rounded px-2 py-1 w-full text-sm"
            value={comments[row.original.id] || ""}
            onChange={(e) =>
              handleCommentChange(row.original.id, e.target.value)
            }
            placeholder="Add comment..."
          />
        ),
      });
    }

    return base;
  }, [showComments, comments]);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customer List</h1>
        <button onClick={handleOpen} className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Add Customer
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search customers..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div className="overflow-auto bg-white shadow rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-left cursor-pointer select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogComments}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition cursor-pointer"
        >
          {showComments ? "Log Comments" : "Add Comments"}
        </button>
      </div>
    </div>
  );
};

export default CustomerTable;

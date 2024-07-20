import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ShortLinkUserTableData } from "definitions";

type TableProps = {
  data?: ShortLinkUserTableData[];
};

const Table = ({ data }: TableProps) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Original URL
            </th>
            <th scope="col" className="px-6 py-3">
              Short URL
            </th>
            <th scope="col" className="px-6 py-3">
              Views
            </th>
            <th scope="col" className="px-6 py-3">
              Is Active
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="bg-white border-b">
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">
                <a
                  className="hover:text-blue-600"
                  href={item.originalUrl}
                  target="_blank"
                >
                  {item.originalUrl}
                </a>
              </td>
              <td className="px-6 py-4">
                <a
                  className="hover:text-blue-600"
                  href={item.shortUrl}
                  target="_blank"
                >
                  {item.shortUrl}
                </a>
              </td>
              <td className="px-6 py-4">{item.views}</td>
              <td className="px-6 py-4">
                {item.isActive ? (
                  <CheckCircleIcon className="size-6 text-emerald-400" />
                ) : (
                  <XCircleIcon className="size-6 text-rose-400" />
                )}
              </td>
              <td className="px-6 py-4">
                <PencilSquareIcon className="size-6 hover:text-emerald-600 inline-block mr-2" />
                <TrashIcon className="size-6 hover:text-rose-600 inline-block" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

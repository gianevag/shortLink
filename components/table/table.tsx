import {
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { TableData } from "definitions";

const mockTableData: TableData[] = [
  {
    id: 1,
    originalUrl: "www.myUrl1.com",
    shortUrl: "www.shortLink1.com",
    views: 12,
    isActive: true,
  },
  {
    id: 2,
    originalUrl: "www.myUrl2.com",
    shortUrl: "www.shortLink2.com",
    views: 1,
    isActive: true,
  },
  {
    id: 3,
    originalUrl: "www.myUrl3.com",
    shortUrl: "www.shortLink3.com",
    views: 2,
    isActive: false,
  },
];

type TableProps = {
  data?: TableData[];
};

const Table = ({ data = mockTableData }: TableProps) => {
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
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.originalUrl}</td>
              <td className="px-6 py-4">{item.shortUrl}</td>
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

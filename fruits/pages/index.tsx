import { Input } from "components/input";
import type { NextPage } from "next";
import Head from "next/head";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FruitSerialized } from "../lib/prisma-types";

type SearchParams = {
  name: string;
  color: string;
  in_season: string;
};

const useFruits = () => {
  const [fruits, setFruits] = useState([] as FruitSerialized[]);

  const fetchFruit = useCallback(async (options?: SearchParams) => {
    let params = new URLSearchParams();
    if (options) {
      const filteredOptions = Object.entries(options).filter(
        ([, value]) => value
      );
      if (filteredOptions.length) {
        params = new URLSearchParams(filteredOptions);
      }
    }
    const searchParams = params.toString();
    const response = await fetch(
      `/api/fruit/${searchParams.length ? `?${searchParams}` : ""}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      setFruits(await response.json());
    }
  }, []);

  useEffect(() => {
    fetchFruit();
  }, [fetchFruit]);

  return [fruits, fetchFruit] as const;
};

const Home: NextPage = () => {
  const [params, setParams] = useState<SearchParams>({
    name: "",
    in_season: "",
    color: "",
  });

  const [fruits, fetchFruit] = useFruits();
  const handleUpdates = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const { name, value } = e.currentTarget;
      setParams((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const submitSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("hitting");
    fetchFruit(params);
  };

  return (
    <div className="pt-5 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Head><title>SmartRent Fruit Search</title></Head>
      <form className="px-2 sm:flex flex-row gap-2 items-center" onSubmit={submitSearch}>
        <h3 className="text-xl font-medium pb-2">Search Fruits</h3>
        <Input
          onChange={handleUpdates}
          label="Name"
          name="name"
          value={params.name}
        />
        <Input
          onChange={handleUpdates}
          label="In Season"
          name="in_season"
          value={params.in_season}
        />
        <Input
          onChange={handleUpdates}
          label="Color"
          name="color"
          value={params.color}
        />
        <button
          className="nline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          submit
        </button>
      </form>
      <main>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                In Season
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Colors
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {fruits.map((fruit) => (
              <tr key={fruit.name}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {fruit.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {`${fruit.in_season}`}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {fruit.colors.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;

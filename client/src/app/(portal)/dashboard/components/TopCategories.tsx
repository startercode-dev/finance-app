interface Props {
  categories: [
    {
      _id: string;
      total: number;
    },
  ];
}

export default async function TopCategories({ categories }: Props) {
  // Filter the top five categories
  const results = categories.slice(0, 5);

  return (
    <div className="flex flex-col gap-4 p-5">
      <h2 className="text-2xl">Top Categories</h2>

      <ul className="overflow-y-auto">
        {results.map((category) => {
          // console.log(category._id);
          return (
            <li
              className="mb-6 flex items-center justify-between"
              key={category._id}
            >
              <div className="flex items-center gap-5">
                <div className="h-8 w-8 rounded-full bg-green-800"></div>
                <p>{category._id}</p>
              </div>
              <p>${category.total}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

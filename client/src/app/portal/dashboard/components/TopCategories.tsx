interface Props {
  categories: [
    {
      _id: string;
      total: number;
      iconUrl: string;
    },
  ];
}

export default async function TopCategories({ categories }: Props) {
  // Filter the top five categories
  const results = categories.slice(0, 5);

  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <h2 className="font-title text-2xl tracking-wider">/Top Categories</h2>

      <ul className="overflow-y-scroll">
        {results.map((category) => {
          return (
            <li
              className="mb-6 flex items-center justify-between last:mb-0"
              key={category._id}
            >
              <div className="flex items-center gap-5">
                <div className="h-8 w-8">
                  <img
                    src={category.iconUrl}
                    alt=""
                    className="mix-blend-darken"
                  />
                </div>
                <p>{category._id}</p>
              </div>
              <p className="font-semibold">${category.total}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

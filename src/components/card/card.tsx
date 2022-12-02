interface ICard {
  description: string;
  image: string;
  name: string;
}

export const Card = ({image, name, description}: ICard) => (
  <div className="rounded-lg shadow-lg bg-white max-w-sm">
    <img className="rounded-t-lg" src={`collections/${image}`} alt={name} />
    <div className="p-4">
      <h5 className="text-gray-900 text-lg font-medium mb-1">{name}</h5>
      <p className="text-gray-500 text-sm flex items-center">
        {description}
      </p>
    </div>
  </div>
)

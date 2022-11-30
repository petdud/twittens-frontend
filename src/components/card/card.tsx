interface ICard {
  description: string;
  image: string;
  name: string;
}

export const Card = ({image, name, description}: ICard) => (
  <div className="rounded-lg shadow-lg bg-white max-w-sm">
    <img className="rounded-t-lg" src={`collections/${image}`} alt={name} />
    <div className="p-6">
      <h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
      <p className="text-gray-700 text-base">
        {description}
      </p>
    </div>
  </div>
)
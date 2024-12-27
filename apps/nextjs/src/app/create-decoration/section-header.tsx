interface Props {
  title: string;
  description: string;
}

export const SectionHeader = ({ title, description }: Props) => {
  return (
    <div className="mb-[22px] lg:mb-[35px] lg:mt-8">
      <h1 className="mb-2 text-2xl font-bold lg:text-[32px]">{title}</h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

import { Heading } from "@/components/Heading";
import { toolsObjects } from "@/utils/constants";
import FormSearch from "./form";
const page = toolsObjects.points;

const PointPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <>
      <Heading.root>
        <Heading.icon
          Icon={page.icon}
          iconColor={page.color}
          bgColor={page.color}
        />
        <Heading.title
          title={page.label}
          description={page.subTitle}
          color={page.colorDark}
        />
      </Heading.root>
      <FormSearch />
    </>
  );
};

export default PointPage;

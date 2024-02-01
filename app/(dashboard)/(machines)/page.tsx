import { Heading } from "@/components/Heading";
import { toolsObjects } from "@/utils/constants";
import FormProducts from "./form";
const page = toolsObjects.machine;

const MachinePage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div>
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
      <FormProducts />
    </div>
  );
};

export default MachinePage;

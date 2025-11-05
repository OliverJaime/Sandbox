import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  // @ts-expect-error
} from "../../shadcn/ui/accordion";

export interface AccordionProps {
  p: p;
}

type p = {
  TriggerText: string;
  TriggerBody: string | undefined;
  TriggerBodyHTML: string | undefined;
};

export const AccordionComponent = (props: AccordionProps) => {
  // console.log("props are ", props.p.TriggerText);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={props.p.TriggerText}>
        <AccordionTrigger>{props.p.TriggerText}</AccordionTrigger>
        <AccordionContent>
          {props.p.TriggerBody ? props.p.TriggerBody : null}
          {props.p.TriggerBodyHTML ? (
            <div
              dangerouslySetInnerHTML={{ __html: props.p.TriggerBodyHTML }}
            ></div>
          ) : null}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

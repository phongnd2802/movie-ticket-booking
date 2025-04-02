import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function InputField({ name, control, icon, placeholder, type }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field}>
              {icon && icon}
            </Input>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputField;

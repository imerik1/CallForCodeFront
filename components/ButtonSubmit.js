import { TextField } from "@material-ui/core";

export const ButtonSubmit = ({ text, id }) => {
  return (
    <TextField
      className="w-min"
      variant="filled"
      id={id}
      type="submit"
      value={text}
    />
  );
};

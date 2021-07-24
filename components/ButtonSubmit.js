import { TextField } from "@material-ui/core";

export const ButtonSubmit = (text) => {
  return (
    <TextField
      className="w-min"
      variant="filled"
      id="submit"
      type="submit"
      value={text}
    />
  );
};

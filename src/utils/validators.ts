export const required =
  (msg = 'Required') =>
  (val: string) =>
    val.trim() ? null : msg;

export const minLength = (len: number) => (val: string) =>
  val.length >= len ? null : `Min ${len} chars`;

export const email = () => (val: string) =>
  /\S+@\S+\.\S+/.test(val) ? null : 'Invalid email';

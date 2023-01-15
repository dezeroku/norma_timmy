# norma_timmy

Simple JS app to calculate required factory norm.
This is useful if e.g. you don't have parts to make only a single variant during the shift.

Given three variants of a product, with different norm requirements:

- 4p -> 190 required per shift
- 8p -> 165 required per shift
- 12p -> 115 required per shift

and assuming that by default only a single variant of product is done during a single shift,
find a combination of variants of products that "fills" a single shift.
More specifically:

```
a = 1/190
b = 1/165
c = 1/115

X * a + Y * b + Z * c >= 1

Find X, Y and Z values (in that priority) which meets the equation.

E.g. you're given X = 100, how big must Y be (if Z is 0) to meet the equation?
If you're given X = 100 and Y = 30, how big must Z be to meet the equation?
```

To simplify UX here, if user doesn't provide a value for X/Y/Z, we assume that all the other values are zeroed out.

# typography Package

Adds functions and mixins to manage the font & typography styles.

To configure the typography on your project. 

1. Load the font files from the assets location or alternatively use googlefont loader to make available your fonts
```
@include fontFace('GTSectraFine', './assets/GT-Sectra-Fine-Regular', 400, normal);
@include googleFont('Work+Sans:200,300,400,500,600');
```

2. Bind your available typographies on the $font-family set
```
  $font-family: (
    work-sans: ('Work Sans', sans-serif),
    sectra-fine: ('GTSectraFine', serif)
);
```

3. Define your typesets (font props related to a breakpoint)
```
$font-typeset: (
  my-typeset: ( 
    xs: ( font-family: font(work-sans)),
    sm: ( font-family: font(work-sans)),
    md: ( font-family: font(work-sans)),
    lg: ( font-family: font(work-sans))
  ),
);
```

4. Use it in your component css styles
```
.myComponent {
  @include useType(my-typeset);
}
```

This will make available all your font css definitions by breakpoint.
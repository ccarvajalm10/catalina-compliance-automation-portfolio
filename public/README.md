# public/

Static assets served at the site root.

## Add your portrait

Save the black-and-white photo here as **`catalina.jpg`** (this exact name):

```
public/catalina.jpg
```

The About section on the landing page renders it as a 132px circle
(`lib/site.ts` → `author.photo`). Set `author.photo` to `""` to hide it.

A square-ish crop works best since it's masked to a circle. ~600×600px is plenty.

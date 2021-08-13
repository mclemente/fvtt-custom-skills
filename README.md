# Custom Skills 5e

A simple mod that adds skills to the dnd5e system.

## Known Issues
- Only for blank worlds or new characters. It only overrides the character creation currently.
- This version doesn't include a way to add skills through the settings, only by editing its files.
- Updating this module will override anything you've added.

## How to Use

You'll need to edit `skills.js` and the `lang/en.json` files. and edit the `skills` variable.

On `skills.js`, add the skills you want like the following:

```
js
export const skills = {
	cul: {
		value: 0,
		ability: "int"
	},
}
```

Then, on `lang/en.json`, and add the key you just added like this:

```
json
"custom-skills": {
	"cul": "Culture"
}

```

(Optional) Go to `custom-skills.css` and increase both values by 20 for each skill you've added to avoid having a vertical scrollbar on the sheet.

The software component of this system is distributed under the Creative Commons license.
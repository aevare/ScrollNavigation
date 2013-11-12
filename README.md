ScrollNavigation
================

<p>
Changes the selected item in navigation when you scroll<br>
Started with:
</p>
`````javascript
$('nav a').ScrollNavigation();
`````
<p>Where 'nav a', is the navigation elements that we search for.<br>
The default settings are these:</p>

`````javascript
{
  sections: '#content section', // containers
  throttle: 250, // ms to throttle the function
  margin: 50, // px margin, this is margin from the top before section is set to active,
  activeClass: 'selected' // active class set on the anchor
}
`````

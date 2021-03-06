#version 330
out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D colorTex;

void main()
{
	FragColor = texture(colorTex, TexCoords);
}
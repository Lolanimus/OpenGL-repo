#version 330
in vec4 FragPos;

uniform vec3 lightPos;
uniform float far_plane;

void main()
{
	float ligthDistance = length(FragPos.xyz - lightPos);
	ligthDistance = ligthDistance / far_plane;
	gl_FragDepth = ligthDistance;
}
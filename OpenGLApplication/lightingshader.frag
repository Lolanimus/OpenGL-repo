#version 330
out vec4 FragColor;

in VS_OUT {
	vec3 FragPos;
	vec3 Normal;
	vec2 TexCoords;
} fs_in;

uniform sampler2D floorTexture;

uniform vec3 lightPositions[10];
uniform vec3 lightColors[10];
uniform vec3 viewPos;
uniform bool gamma;

vec3 BlinnPhong(vec3 norm, vec3 fragPos, vec3 lightPos, vec3 lightColor)
{
	// diffuse
	vec3 lightDir = normalize(lightPos - fragPos);
	float diff = max(dot(lightDir, norm), 0.0);
	vec3 diffuse = diff * lightColor;

	// specular
	vec3 viewDir = normalize(viewPos - fragPos);
	vec3 halfwayDir = normalize(lightDir + viewDir);
	float spec = pow(max(dot(norm, halfwayDir), 0.0), 32.0);
	vec3 specular = vec3(0.3) * spec;

	//gamma
	float max_distance = 1.5;
	float distance = length(lightPos - fragPos);
	float attenuation = 1.0 / (gamma ? distance * distance : distance);

	diffuse *= attenuation;
	specular *= attenuation;

	return diffuse + specular;
}

void main()
{
	vec3 color = texture(floorTexture, fs_in.TexCoords).rgb;
	vec3 lighting = vec3(0.0);

	for(int i = 0; i < 10; i++)
		lighting += BlinnPhong(normalize(fs_in.Normal), fs_in.FragPos, lightPositions[i], lightColors[i]);

	color *= lighting;
	if(gamma)
		color = pow(color, vec3(1.0/2.2));
	FragColor = vec4(color, 1.0);
}
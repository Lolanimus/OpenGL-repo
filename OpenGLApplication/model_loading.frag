﻿#version 330 core
out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D texture1;

float near = 0.1f;
float far = 100f;

float LinearizeDepth(float depth) 
{
    float z = depth * 2.0 - 1.0;
    return (2.0 * near * far) / (far + near - z * (far - near)); 
}

void main()
{    
    float depth = LinearizeDepth(gl_FragCoord.z) / far;
    FragColor = texture(texture1, TexCoords);
}
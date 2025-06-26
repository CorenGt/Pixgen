// Modern AI Image Generator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('imageGeneratorForm');
    if (!form) return;
    
    const promptInput = document.getElementById('prompt');
    const sizeSelect = document.getElementById('size');
    const generateBtn = form.querySelector('.generate-btn');
    const previewArea = document.getElementById('imagePreview');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Enhanced prompt suggestions with emojis
    const promptSuggestions = [
        {
            emoji: '🌅',
            title: 'Sunset Mountains',
            prompt: '🌅 A beautiful sunset over mountains, digital art style, vibrant colors, dramatic lighting, high quality'
        },
        {
            emoji: '🦄',
            title: 'Magical Unicorn',
            prompt: '🦄 A magical unicorn in an enchanted forest, fantasy art, mystical atmosphere, glowing colors'
        },
        {
            emoji: '🏙️',
            title: 'Cyberpunk City',
            prompt: '🏙️ Futuristic cityscape at night, cyberpunk style, neon lights, rain reflections, sci-fi'
        },
        {
            emoji: '🌸',
            title: 'Cherry Blossoms',
            prompt: '🌸 Cherry blossoms in spring, anime style, soft pastel colors, peaceful atmosphere'
        },
        {
            emoji: '🐺',
            title: 'Majestic Wolf',
            prompt: '🐺 Majestic wolf in snowy landscape, realistic style, dramatic lighting, winter scene'
        },
        {
            emoji: '🎨',
            title: 'Abstract Art',
            prompt: '🎨 Abstract colorful painting, modern art style, flowing shapes, vibrant colors'
        },
        {
            emoji: '🚀',
            title: 'Space Explorer',
            prompt: '🚀 Astronaut exploring alien planet, sci-fi art, cosmic background, detailed spacesuit'
        },
        {
            emoji: '🏰',
            title: 'Fantasy Castle',
            prompt: '🏰 Medieval fantasy castle on cliff, magical atmosphere, dramatic clouds, fantasy art'
        }
    ];

    // Form submission handler with enhanced experience
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const prompt = promptInput.value.trim();
        const size = sizeSelect.value;
        
        // Enhanced validation
        if (!prompt) {
            showNotification('🚨 Please enter a description for your image.', 'error');
            promptInput.focus();
            return;
        }
        
        if (prompt.length < 10) {
            showNotification('📝 Please provide a more detailed description (at least 10 characters).', 'warning');
            promptInput.focus();
            return;
        }
        
        // Start generation process
        startGeneration();
        
        try {
            const formData = new FormData();
            formData.append('prompt', prompt);
            formData.append('size', size);
            
            const response = await fetch('/generate-image', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showGeneratedImage(data.image_url, data.prompt, data.message);
                showNotification('🎨 Image generated successfully!', 'success');
                
                // Add sparkle effect
                createCelebrationEffect();
            } else {
                showError(data.message || 'Failed to generate image. Please try again.');
                showNotification('❌ ' + (data.message || 'Generation failed'), 'error');
            }
            
        } catch (error) {
            console.error('Error generating image:', error);
            showError('Network error. Please check your connection and try again.');
            showNotification('🌐 Network error. Please check your connection.', 'error');
        } finally {
            stopGeneration();
        }
    });

    function startGeneration() {
        // Disable form with smooth transitions
        generateBtn.disabled = true;
        promptInput.disabled = true;
        sizeSelect.disabled = true;
        
        // Update button with animation
        generateBtn.innerHTML = '<i class="fas fa-magic fa-spin"></i> ✨ Creating Magic...';
        generateBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        // Show loading with smooth transition
        previewArea.style.opacity = '0';
        setTimeout(() => {
            previewArea.style.display = 'none';
            loadingSpinner.style.display = 'block';
            loadingSpinner.style.opacity = '0';
            setTimeout(() => {
                loadingSpinner.style.opacity = '1';
            }, 100);
        }, 300);
        
        // Add loading animation to page
        document.body.style.cursor = 'wait';
    }
    
    function stopGeneration() {
        // Enable form
        generateBtn.disabled = false;
        promptInput.disabled = false;
        sizeSelect.disabled = false;
        
        // Reset button
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> ✨ Generate Amazing Image';
        generateBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        
        // Show preview with smooth transition
        loadingSpinner.style.opacity = '0';
        setTimeout(() => {
            loadingSpinner.style.display = 'none';
            previewArea.style.display = 'block';
            previewArea.style.opacity = '1';
        }, 300);
        
        // Reset cursor
        document.body.style.cursor = 'default';
    }
    
    function showGeneratedImage(imageUrl, prompt, message) {
        previewArea.innerHTML = `
            <div class="generator-container">
                <div class="generated-image-container">
                    <div class="image-wrapper">
                        <img src="${imageUrl}" alt="Generated: ${prompt}" class="generated-image" 
                             style="width: 100%; border-radius: 15px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
                        <div class="image-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
                             background: linear-gradient(45deg, rgba(0,0,0,0.8), transparent); 
                             opacity: 0; transition: all 0.3s ease; display: flex; align-items: center; 
                             justify-content: center; border-radius: 15px;">
                            <div class="image-actions" style="display: flex; gap: 15px;">
                                <button class="action-btn download-btn" onclick="downloadImage('${imageUrl}', '${prompt.replace(/'/g, "\\'")}')">
                                    <i class="fas fa-download"></i> Download
                                </button>
                                <button class="action-btn share-btn" onclick="shareImage('${imageUrl}')">
                                    <i class="fas fa-share"></i> Share
                                </button>
                                <button class="action-btn retry-btn" onclick="regenerateImage()">
                                    <i class="fas fa-redo"></i> Regenerate
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="image-info" style="background: rgba(255,255,255,0.05); padding: 25px; 
                         border-radius: 15px; margin-top: 20px; backdrop-filter: blur(20px);
                         border: 1px solid rgba(255,255,255,0.1);">
                        <h4 style="color: #00fcdb; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            ✨ Generated Successfully! 
                            <span style="font-size: 0.8rem; background: rgba(0,252,219,0.2); padding: 4px 12px; border-radius: 15px;">
                                ${getSizeDisplay(sizeSelect.value)}
                            </span>
                        </h4>
                        <p class="image-prompt" style="color: rgba(255,255,255,0.9); margin-bottom: 10px; line-height: 1.6;">
                            <strong>📝 Prompt:</strong> "${prompt}"
                        </p>
                        <p class="generation-message" style="color: rgba(255,255,255,0.7); margin: 0; font-size: 0.9rem;">
                            ⏱️ ${message}
                        </p>
                        <div style="margin-top: 15px; display: flex; gap: 10px; flex-wrap: wrap;">
                            <span style="background: rgba(102,126,234,0.2); color: #667eea; padding: 4px 12px; border-radius: 15px; font-size: 0.8rem;">
                                🤖 Stable Diffusion XL
                            </span>
                            <span style="background: rgba(0,252,219,0.2); color: #00fcdb; padding: 4px 12px; border-radius: 15px; font-size: 0.8rem;">
                                🎨 AI Generated
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add hover effect to image
        const imageWrapper = previewArea.querySelector('.image-wrapper');
        const imageOverlay = previewArea.querySelector('.image-overlay');
        
        imageWrapper.addEventListener('mouseenter', () => {
            imageOverlay.style.opacity = '1';
        });
        
        imageWrapper.addEventListener('mouseleave', () => {
            imageOverlay.style.opacity = '0';
        });
        
        // Add fade-in animation
        const imageContainer = previewArea.querySelector('.generated-image-container');
        imageContainer.style.opacity = '0';
        imageContainer.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            imageContainer.style.transition = 'all 0.6s ease';
            imageContainer.style.opacity = '1';
            imageContainer.style.transform = 'translateY(0)';
        }, 100);
    }
    
    function showError(message) {
        previewArea.innerHTML = `
            <div class="generator-container">
                <div class="error-container" style="text-align: center; padding: 60px 20px;">
                    <div class="error-icon" style="font-size: 4rem; color: #ff6b6b; margin-bottom: 20px; animation: shake 0.5s ease-in-out;">
                        😵
                    </div>
                    <h4 style="color: #ff6b6b; margin-bottom: 15px;">Generation Failed</h4>
                    <p class="error-message" style="color: rgba(255,255,255,0.8); margin-bottom: 25px; line-height: 1.6;">
                        ${message}
                    </p>
                    <button class="retry-btn" onclick="retryGeneration()" style="background: linear-gradient(135deg, #ff6b6b, #ff8e8e); 
                            border: none; color: white; padding: 12px 25px; border-radius: 25px; font-weight: 600; 
                            cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-redo"></i> Try Again
                    </button>
                </div>
            </div>
        `;
        
        // Add shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Character counter with enhancements
    if (promptInput) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            margin-top: 10px;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.6);
            text-align: right;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        charCounter.innerHTML = '<span><i class="fas fa-keyboard"></i> 0 characters</span><span>💡 Be descriptive for better results!</span>';
        promptInput.parentNode.appendChild(charCounter);
        
        promptInput.addEventListener('input', function() {
            const length = this.value.length;
            const wordCount = this.value.trim().split(/\s+/).filter(word => word.length > 0).length;
            
            let tip = '💡 Be descriptive for better results!';
            let color = '#00fcdb';
            
            if (length > 400) {
                tip = '⚠️ Very long prompt - consider shortening';
                color = '#ff6b6b';
            } else if (length > 200) {
                tip = '✅ Great detail level!';
                color = '#6bcf7f';
            } else if (length > 50) {
                tip = '👍 Good description length';
                color = '#ffd93d';
            } else if (length > 10) {
                tip = '📝 Add more details for better results';
                color = '#00fcdb';
            }
            
            charCounter.innerHTML = `
                <span style="color: ${color}"><i class="fas fa-keyboard"></i> ${length} characters • ${wordCount} words</span>
                <span style="color: rgba(255,255,255,0.5); font-size: 0.8rem;">${tip}</span>
            `;
        });
    }

    // Enhanced size selector with descriptions
    if (sizeSelect) {
        sizeSelect.addEventListener('change', function() {
            const sizeInfo = document.querySelector('.size-info') || document.createElement('div');
            sizeInfo.className = 'size-info';
            sizeInfo.style.cssText = `
                margin-top: 8px;
                padding: 8px 12px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                color: rgba(255,255,255,0.7);
                font-size: 0.8rem;
            `;
            
            const sizeDescriptions = {
                '512x512': '📱 Perfect for social media posts, avatars, and quick previews',
                '1024x1024': '🖥️ High quality square format, ideal for detailed artwork',
                '1024x512': '🖼️ Landscape format, great for banners and wide compositions',
                '512x1024': '📄 Portrait format, perfect for character art and vertical designs'
            };
            
            sizeInfo.innerHTML = sizeDescriptions[this.value] || '';
            
            if (!document.querySelector('.size-info')) {
                this.parentNode.appendChild(sizeInfo);
            }
        });
        
        // Trigger initial size info
        sizeSelect.dispatchEvent(new Event('change'));
    }
});

// Global helper functions
function getSizeDisplay(size) {
    const sizeMap = {
        '512x512': '📱 Social',
        '1024x1024': '🖥️ HD Square',
        '1024x512': '🖼️ Landscape',
        '512x1024': '📄 Portrait'
    };
    return sizeMap[size] || size;
}

function downloadImage(imageUrl, prompt) {
    const link = document.createElement('a');
    link.href = imageUrl;
    const safeName = prompt.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase();
    link.download = `pixgen-ai-${safeName}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('📥 Image downloaded successfully!', 'success');
}

function shareImage(imageUrl) {
    const fullUrl = window.location.origin + imageUrl;
    
    if (navigator.share) {
        navigator.share({
            title: '🎨 AI Generated Image - Pixgen',
            text: 'Check out this amazing AI generated image!',
            url: fullUrl
        }).then(() => {
            showNotification('📤 Image shared successfully!', 'success');
        }).catch(() => {
            copyToClipboard(fullUrl);
        });
    } else {
        copyToClipboard(fullUrl);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('📋 Image URL copied to clipboard!', 'info');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('📋 Image URL copied to clipboard!', 'info');
    });
}

function regenerateImage() {
    const form = document.getElementById('imageGeneratorForm');
    if (form) {
        showNotification('🔄 Regenerating with same prompt...', 'info');
        form.dispatchEvent(new Event('submit'));
    }
}

function retryGeneration() {
    const generateBtn = document.querySelector('.generate-btn');
    if (generateBtn) {
        generateBtn.click();
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `modern-notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    const colors = {
        success: 'linear-gradient(135deg, #4CAF50, #45a049)',
        error: 'linear-gradient(135deg, #f44336, #da190b)',
        warning: 'linear-gradient(135deg, #ff9800, #f57c00)',
        info: 'linear-gradient(135deg, #2196F3, #0b7dda)'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; padding: 0; margin-left: 10px;">×</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }
    }, 5000);
}

// Celebration effect for successful generation
function createCelebrationEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = ['✨', '🎉', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                pointer-events: none;
                z-index: 9999;
                animation: celebrate 2s ease-out forwards;
                font-size: ${Math.random() * 20 + 15}px;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Add celebration animation
const celebrationKeyframes = `
    @keyframes celebrate {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.8) rotate(360deg) translateY(-100px);
        }
    }
`;

const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = celebrationKeyframes;
document.head.appendChild(celebrationStyle);

// Action button styles
const actionButtonStyles = `
    .action-btn {
        background: rgba(0, 252, 219, 0.2);
        border: 2px solid #00fcdb;
        color: #00fcdb;
        padding: 10px 16px;
        border-radius: 25px;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .action-btn:hover {
        background: #00fcdb;
        color: #0a0a0a;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 252, 219, 0.4);
        text-decoration: none;
    }
    
    .download-btn:hover {
        background: #4CAF50;
        border-color: #4CAF50;
        color: white;
        box-shadow: 0 10px 25px rgba(76, 175, 80, 0.4);
    }
    
    .share-btn:hover {
        background: #2196F3;
        border-color: #2196F3;
        color: white;
        box-shadow: 0 10px 25px rgba(33, 150, 243, 0.4);
    }
    
    .retry-btn:hover {
        background: #ff9800;
        border-color: #ff9800;
        color: white;
        box-shadow: 0 10px 25px rgba(255, 152, 0, 0.4);
    }
`;

const actionStyle = document.createElement('style');
actionStyle.textContent = actionButtonStyles;
document.head.appendChild(actionStyle); 
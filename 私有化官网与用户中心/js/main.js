/**
 * AIOChat 私有化部署网站
 * 主交互逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
  // 通用导航菜单交互
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const dropdownMenu = this.nextElementSibling;
      dropdownMenu.classList.toggle('hidden');
    });
  });

  // 首页搜索框交互
  const searchInputs = document.querySelectorAll('input[type="text"]');
  searchInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('ring-2', 'ring-teal-500');
    });
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('ring-2', 'ring-teal-500');
    });
  });

  // 表单验证
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredInputs = form.querySelectorAll('[required]');
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('border-red-500');
          
          // 创建或显示错误提示
          let errorMessage = input.nextElementSibling;
          if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('p');
            errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
          }
          errorMessage.textContent = '此字段为必填项';
        } else {
          input.classList.remove('border-red-500');
          
          // 移除错误提示
          const errorMessage = input.nextElementSibling;
          if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  // 验证码按钮功能
  const verificationButtons = document.querySelectorAll('.verification-button');
  verificationButtons.forEach(button => {
    button.addEventListener('click', function() {
      const emailInput = button.closest('form').querySelector('input[type="email"]');
      
      if (!emailInput || !emailInput.value.trim()) {
        alert('请先输入邮箱地址');
        return;
      }
      
      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        alert('请输入有效的邮箱地址');
        return;
      }
      
      // 发送验证码倒计时
      let countdown = 60;
      button.disabled = true;
      button.textContent = `${countdown}秒后重新获取`;
      
      const timer = setInterval(() => {
        countdown--;
        button.textContent = `${countdown}秒后重新获取`;
        
        if (countdown <= 0) {
          clearInterval(timer);
          button.disabled = false;
          button.textContent = '获取验证码';
        }
      }, 1000);
    });
  });

  // 私有化部署表单提示
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', function() {
      const tooltip = document.getElementById(this.dataset.tooltip);
      if (tooltip) {
        tooltip.classList.remove('hidden');
      }
    });
    
    trigger.addEventListener('mouseleave', function() {
      const tooltip = document.getElementById(this.dataset.tooltip);
      if (tooltip) {
        tooltip.classList.add('hidden');
      }
    });
  });

  // 下载授权文件按钮
  const downloadButtons = document.querySelectorAll('.download-button');
  downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
      // 模拟下载请求
      button.textContent = '下载中...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = '下载文件';
        button.disabled = false;
        alert('授权文件已成功下载');
      }, 1500);
    });
  });
}); 
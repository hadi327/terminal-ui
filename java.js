document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.querySelector('.terminal_body');
  const exitBtn = document.querySelector('.btn-color');
  const addTabBtn = document.querySelector('.add_tab');

  let currentInputSpan = null;
  let currentPrompt = null;

  // Initialize interactive terminal line
  function createPromptLine() {
    // Hide or remove cursor from previous active line
    const activeCursor = document.querySelector('.terminal_cursor');
    if (activeCursor) {
      activeCursor.remove();
    }

    // Create prompt container
    const prompt = document.createElement('div');
    prompt.className = 'terminal_promt';

    // Build prompt HTML structure
    prompt.innerHTML = `
      <span class="terminal_user">johndoe@admin:</span>
      <span class="terminal_location">~</span>
      <span class="terminal_bling">$</span>
      <span class="terminal_input" style="color: #fff; margin-left: 6px; white-space: pre;"></span>
      <span class="terminal_cursor"></span>
    `;

    terminalBody.appendChild(prompt);
    currentPrompt = prompt;
    currentInputSpan = prompt.querySelector('.terminal_input');
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Handle Command Execution
  function handleCommand(cmd) {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const output = document.createElement('div');
    output.style.color = '#d5d0ce';
    output.style.marginLeft = '4px';
    output.style.marginBottom = '4px';

    const args = trimmedCmd.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
      case 'clear':
        terminalBody.innerHTML = '';
        return;

      case 'help':
        output.innerText = 'Available commands: help, clear, echo [text], date, whoami';
        break;

      case 'whoami':
        output.innerText = 'johndoe';
        break;

      case 'date':
        output.innerText = new Date().toString();
        break;

      case 'echo':
        output.innerText = args.slice(1).join(' ');
        break;

      default:
        output.innerText = `command not found: ${command}`;
        break;
    }

    terminalBody.appendChild(output);
  }

  // Capture Typing Events
  document.addEventListener('keydown', (e) => {
    if (!currentInputSpan) return;

    if (e.key === 'Enter') {
      const commandText = currentInputSpan.textContent;
      
      // Move cursor to end of input line statically
      const activeCursor = currentPrompt.querySelector('.terminal_cursor');
      if (activeCursor) activeCursor.remove();

      handleCommand(commandText);
      createPromptLine();
    } else if (e.key === 'Backspace') {
      currentInputSpan.textContent = currentInputSpan.textContent.slice(0, -1);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      currentInputSpan.textContent += e.key;
    }
  });

  // Toolbar Button Actions
  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      terminalBody.innerHTML = '<div style="color: #888; padding: 8px;">Terminal session closed.</div>';
      currentInputSpan = null;
    });
  }

  if (addTabBtn) {
    addTabBtn.addEventListener('click', () => {
      terminalBody.innerHTML = '';
      createPromptLine();
    });
  }

  // Initial prompt start
  createPromptLine();
});
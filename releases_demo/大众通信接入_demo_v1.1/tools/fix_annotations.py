import json
import re

def restore_and_inject():
    log_path = '/Users/huhaowen/.gemini/antigravity-ide/brain/dffff9ca-3f6f-4700-966a-8a7f1efda0bf/.system_generated/logs/transcript_full.jsonl'
    
    found_content = None
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if not line.strip():
                continue
            try:
                data = json.loads(line)
                content = data.get('content', '')
                if 'Total Lines: 680' in content and 'window.AnnotationData = {' in content:
                    found_content = content
                    break
            except Exception as e:
                pass
                
    if not found_content:
        print("Could not find content.")
        return

    lines = found_content.split('\n')
    code_lines = []
    started = False
    for line in lines:
        if 'Showing lines' in line or 'Total Lines' in line:
            started = True
            continue
        if started:
            if 'The above content does NOT show' in line:
                break
            if 'The following code has been modified' in line:
                continue
            m = re.match(r'^\s*(\d+):\s?(.*)$', line)
            if m:
                code_lines.append(m.group(2))
            else:
                if line.strip() == "":
                    code_lines.append("")

    restored_code = '\n'.join(code_lines)
    
    # 写入 annotations_debug.js 供调试
    with open('annotations/annotations_debug.js', 'w', encoding='utf-8') as f:
        f.write(restored_code)

    raw_json = restored_code.replace('window.AnnotationData = ', '').strip()
    if raw_json.endswith(';'):
        raw_json = raw_json[:-1]
        
    try:
        data = json.loads(raw_json)
        print("JSON loaded successfully!")
    except Exception as e:
        print("JSON decode error:", e)
        return

if __name__ == '__main__':
    restore_and_inject()

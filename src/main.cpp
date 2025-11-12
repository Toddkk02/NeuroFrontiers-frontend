#include <GLFW/glfw3.h>
#include <iostream>
#include <vector>
#include <string>

// Text Buffer - core del editor
class TextBuffer {
private:
    std::vector<std::string> lines;
    size_t cursor_row = 0;
    size_t cursor_col = 0;

public:
    TextBuffer() {
        lines.push_back(""); // almeno una linea vuota
    }

    void insert_char(char c) {
        if (c == '\n') {
            std::string current_line = lines[cursor_row];
            std::string new_line = current_line.substr(cursor_col);
            lines[cursor_row] = current_line.substr(0, cursor_col);
            lines.insert(lines.begin() + cursor_row + 1, new_line);
            cursor_row++;
            cursor_col = 0;
        } else {
            lines[cursor_row].insert(cursor_col, 1, c);
            cursor_col++;
        }
    }

    void delete_char() {
        if (cursor_col > 0) {
            lines[cursor_row].erase(cursor_col - 1, 1);
            cursor_col--;
        } else if (cursor_row > 0) {
            cursor_col = lines[cursor_row - 1].length();
            lines[cursor_row - 1] += lines[cursor_row];
            lines.erase(lines.begin() + cursor_row);
            cursor_row--;
        }
    }

    void move_cursor(int dr, int dc) {
        if (dr != 0) {
            cursor_row = std::max(0, std::min((int)lines.size() - 1, (int)cursor_row + dr));
            cursor_col = std::min(cursor_col, lines[cursor_row].length());
        }
        
        if (dc != 0) {
            cursor_col = std::max(0, std::min((int)lines[cursor_row].length(), (int)cursor_col + dc));
        }
    }

    void print_buffer() {
        system("clear");
        
        for (size_t i = 0; i < lines.size(); i++) {
            if (i == cursor_row) {
                std::string line = lines[i];
                if (cursor_col < line.length()) {
                    line.insert(cursor_col, "|");
                } else {
                    line += "|";
                }
                std::cout << line << std::endl;
            } else {
                std::cout << lines[i] << std::endl;
            }
        }
        std::cout << "\n[ESC] Quit | [Arrow Keys] Move | [Backspace] Delete\n";
    }
};

void key_callback(GLFWwindow* window, int key, int scancode, int action, int mods) {
    if (action != GLFW_PRESS && action != GLFW_REPEAT) return;
    
    TextBuffer* buffer = static_cast<TextBuffer*>(glfwGetWindowUserPointer(window));
    
    switch (key) {
        case GLFW_KEY_ESCAPE:
            glfwSetWindowShouldClose(window, GLFW_TRUE);
            break;
        case GLFW_KEY_UP:
            buffer->move_cursor(-1, 0);
            break;
        case GLFW_KEY_DOWN:
            buffer->move_cursor(1, 0);
            break;
        case GLFW_KEY_LEFT:
            buffer->move_cursor(0, -1);
            break;
        case GLFW_KEY_RIGHT:
            buffer->move_cursor(0, 1);
            break;
        case GLFW_KEY_BACKSPACE:
            buffer->delete_char();
            break;
        case GLFW_KEY_ENTER:
            buffer->insert_char('\n');
            break;
    }
}

void char_callback(GLFWwindow* window, unsigned int codepoint) {
    TextBuffer* buffer = static_cast<TextBuffer*>(glfwGetWindowUserPointer(window));
    if (codepoint < 128) {
        buffer->insert_char(static_cast<char>(codepoint));
    }
}

int main() {
    if (!glfwInit()) {
        std::cerr << "Failed to initialize GLFW\n";
        return -1;
    }

    GLFWwindow* window = glfwCreateWindow(800, 600, "Simple Text Editor", nullptr, nullptr);
    if (!window) {
        std::cerr << "Failed to create GLFW window\n";
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(window);

    TextBuffer buffer;
    glfwSetWindowUserPointer(window, &buffer);
    glfwSetKeyCallback(window, key_callback);
    glfwSetCharCallback(window, char_callback);

    std::cout << "Text Editor started!\n\n";

    while (!glfwWindowShouldClose(window)) {
        buffer.print_buffer();
        glfwPollEvents();
        glClear(GL_COLOR_BUFFER_BIT);
        glfwSwapBuffers(window);
    }

    glfwDestroyWindow(window);
    glfwTerminate();
    return 0;
}

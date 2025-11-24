
from playwright.sync_api import sync_playwright, expect

def verify_cheat_key(page):
    # Navigate to the local preview
    page.goto("http://localhost:4173")

    # Wait for the content to load
    expect(page.get_by_text("CapCut Cheat Key")).to_be_visible()

    # Search for the new cheat key
    search_input = page.get_by_placeholder("검색")
    search_input.fill("단축키 마스터")

    # Wait for the card to appear
    card_title = page.get_by_text("단축키 마스터 - 마우스 없이 편집하기")
    expect(card_title).to_be_visible()

    # Verify some content in the card
    expect(page.get_by_text("30년차 에디터의 필수 단축키 세팅")).to_be_visible()

    # Expand the card steps
    expand_button = page.get_by_role("button", name="단계 보기")
    # There might be multiple buttons if search is loose, but "단축키 마스터" should be unique enough or first.
    # We can scope it.
    card = page.locator("div").filter(has_text="단축키 마스터 - 마우스 없이 편집하기").first
    expand_button = card.get_by_role("button", name="단계 보기")
    expand_button.click()

    # Verify steps are visible
    expect(card.get_by_text("Timeline:")).to_be_visible()
    expect(card.get_by_text("- 분할(Split): E")).to_be_visible()

    # Take screenshot
    page.screenshot(path="verification_screenshot.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_cheat_key(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_screenshot.png")
        finally:
            browser.close()
